import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, throwError, BehaviorSubject, combineLatest } from 'rxjs';
import { map, publishReplay, refCount, catchError } from 'rxjs/operators';
import { VarStarOverviewService, VarStarDetailsService, Session, Observation } from '@core/services';
import { LoadingService } from '../../../loading';
import { MessagesService } from '../../../messages';
import * as errorBars from 'chartjs-chart-error-bars/build/Chart.ErrorBars.js';
import { Color } from 'ng2-charts';

type PlotPoint = {
  x: number,
  xMin: number,
  xMax: number,
  y: number,
  yMin: number,
  yMax: number
}

type ChartData = {
  starname: string,
  period: number,
  epoch: number,
  sessionNames: string[],
  sessionPlotPoints: PlotPoint[][],
  minMag: number,
  maxMag: number
}

@Component({
  selector: 'app-varstar-phase-plot',
  templateUrl: './varstar-phase-plot.component.html',
  styleUrls: ['./varstar-phase-plot.component.css']
})
export class VarStarPhasePlotComponent implements OnInit {
  browserTitle = 'Phase Plot | U235-VarStar';
  id: string;
  chart$: Observable<ChartData>;
  starname: string;
  date$ = new BehaviorSubject(new Date());

  lineChartData: any;
  lineChartColors: Color[] = [];

  lineChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Magnitude vs Phase'
    },
    scales: {
      xAxes: [
        {
          display: true
        }
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            reverse: true
          }
        }
      ]
    }
  };

  lineChartLegend = true;
  lineChartPlugins = [ errorBars ];
  lineChartType = 'scatterWithErrorBars';

  captureChart(): Observable<ChartData> {
    return forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.observationsService.getById(this.id)
    }).pipe(
      map(value => {
        const result = {} as ChartData;

        result.starname = value.overview.varstar;
        result.period = parseFloat(value.overview.period);
        if (isNaN(result.period)) {
          throw new Error('Period is not a number');
        }
        result.epoch = parseFloat(value.overview.epoch);
        if (isNaN(result.epoch)) {
          throw new Error('Epoch is not a number');
        }

        result.sessionPlotPoints = [];
        result.sessionNames = [];
        result.minMag = Infinity;
        result.maxMag = -Infinity;

        for (let session of value.details.sessions) {
          const dataset = createPlotPointsForSession(session, result.epoch, result.period);
          result.minMag = dataset.map(p => p.yMin).reduce((min, cur) => Math.min(min, cur), result.minMag);
          result.maxMag = dataset.map(p => p.yMax).reduce((max, cur) => Math.max(max, cur), result.maxMag);
          result.sessionPlotPoints.push(dataset);
          result.sessionNames.push(`Session: ${session.session}`);
        }

        return result;
      }),
      catchError(err => {this.messagesService.showErrors(err.message); return throwError(err); }),
      publishReplay(1),
      refCount()
    );
  }

  renderChart(value: ChartData, date: Date): void {
    this.starname = value.starname;
    this.lineChartData = [];

    const cursorPlotPoints = [];
    const cursorNames = [];

    const avgMag = isFinite(value.minMag) ? (value.minMag + value.maxMag) / 2 : 0;
    const errMag = isFinite(value.minMag) ? (value.maxMag - value.minMag) / 2 : 1;

    let jd = calculateJD(date, calculateJD0FromDate(date));

    cursorPlotPoints.push(createPlotPoints(jd, value.epoch, value.period, avgMag, errMag));
    cursorNames.push(`Now: ${date.toLocaleTimeString()}`);

    jd += 2 / 24;
    date = calculateDate(jd);
    cursorPlotPoints.push(createPlotPoints(jd, value.epoch, value.period, avgMag, errMag));
    cursorNames.push(`Now+2h: ${date.toLocaleTimeString()}`);

    for (let i = 0; i < value.sessionNames.length; i++) {
      this.lineChartData.push({
        data: value.sessionPlotPoints[i],
        label: value.sessionNames[i],
        showLine: false,
        fill: false,
        errorBarColor: 'green',
        errorBarWhiskerColor: 'green',
        errorBarWhiskerSize: 6
      });
      this.lineChartColors.push({
        borderColor: 'green',
        backgroundColor: 'rgba(255,255,0,0.28)'
      });
    }

    this.lineChartData.push({
      data: cursorPlotPoints[0],
      label: cursorNames[0],
      showLine: false,
      fill: false,
      errorBarColor: 'red',
      errorBarWhiskerColor: 'red',
      errorBarWhiskerSize: 6
    });
    this.lineChartColors.push({
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,0,0.28)'
    });

    this.lineChartData.push({
      data: cursorPlotPoints[1],
      label: cursorNames[1],
      showLine: false,
      fill: false,
      errorBarColor: 'blue',
      errorBarWhiskerColor: 'blue',
      errorBarWhiskerSize: 6
    });
    this.lineChartColors.push({
      borderColor: 'blue',
      backgroundColor: 'rgba(255,255,0,0.28)'
    });
  }

  updateTime() {
    this.date$.next(new Date());
  }

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private observationsService: VarStarDetailsService,
    private loadingService: LoadingService,
    private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    const data$ = this.loadingService.showLoadingUntilCompleted(this.captureChart());
    this.chart$ = combineLatest(data$, this.date$).pipe(map(([data, date]) => { this.renderChart(data, date); return data; }));
  }

}

function Phase1(jd: number, epoch: number, period: number): number {
  return ((jd - epoch) % period) / period;
}

function Phase2(phase1: number): number {
  return phase1 - Math.sign(phase1);
}

function createPlotPoint(phase: number, mag: number, err: number): PlotPoint {
  return {
    x: phase,
    xMin: phase,
    xMax: phase,
    y: mag,
    yMin: mag - err,
    yMax: mag + err
  };
}

function createPlotPoints(jd: number, epoch: number, period: number, mag: number, err: number): PlotPoint[] {
  const phase1 = Phase1(jd, epoch, period);
  const phase2 = Phase2(phase1);
  return [
    createPlotPoint(phase1, mag, err),
    createPlotPoint(phase2, mag, err)
  ];
}

function createPlotPointsForObservation(observation: Observation, epoch: number, period: number): PlotPoint[] {
  const jd = parseFloat(observation.jd);
  if (isNaN(jd)) {
    throw new Error('jd is not a number in Observation');
  }
  const mag = parseFloat(observation.mag);
  if (isNaN(mag)) {
    throw new Error('mag is not a number in Observation');
  }
  const err = parseFloat(observation.err);
  if (isNaN(err)) {
    throw new Error('err is not a number in Observation');
  }
  return createPlotPoints(jd, epoch, period, mag, err);
}

function createPlotPointsForSession(session: Session, epoch: number, period: number): PlotPoint[] {
  const dataset = [];
  for (let observation of session.observations) {
    const plotPoints = createPlotPointsForObservation(observation, epoch, period);
    dataset.push(...plotPoints);
  }
  return dataset;
}

function calculateJD0FromDate(date: Date): number {
  let yp = date.getUTCFullYear();
  let mp = date.getUTCMonth() + 1;
  if (mp <= 2) {
    mp += 12;
    yp -= 1;
  }
  let jd0 = Math.trunc(36525 * yp / 100);
  jd0 += Math.trunc((306001 * (1 + mp)) / 10000);
  jd0 += date.getUTCDate() + 2 + Math.trunc(yp / 400);
  jd0 -= Math.trunc(yp / 100);
  return jd0 + 1720994.5;
}

function calculateJD(date: Date, jd0: number): number {
  return jd0 +
    ((date.getUTCHours() + (date.getUTCMinutes() +
    (date.getUTCSeconds() + date.getUTCMilliseconds() /
    1000.0) / 60.0) / 60.0) / 24.0);
}

function calculateDate(jd: number): Date {
  const JGREG = 15 + 31 * (10 + 12 * 1582);
  const julian = jd;
  const p = julian - Math.floor(julian);
  let ja = Math.trunc(Math.floor(julian));
  if (ja >= JGREG) {
    const jalpha = Math.trunc(((ja - 1867216) - 0.25) / 36524.25);
    ja += 1 + jalpha - Math.trunc(jalpha / 4);
  }
  const jb = ja + 1524;
  const jc = Math.trunc(6680.0 + ((jb - 2439870) - 122.1) / 365.25);
  const jdd = 365 * jc + Math.trunc(jc / 4);
  const je = Math.trunc((jb - jdd) / 30.6001);
  const day = jb - jdd - Math.trunc(30.6001 * je);
  let month = je - 1;
  if (month > 12) {
    month -= 12;
  }
  let year = jc - 4715;
  if (month > 2) {
    year -= 1;
  }
  if (year <= 0) {
    year -= 1;
  }
  return new Date(
    Date.UTC(year, month - 1, day) +
    Math.trunc((p + 0.5) * 24 * 60 * 60 * 1000 + 0.5)
  );
}
