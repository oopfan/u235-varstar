import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, throwError, BehaviorSubject, combineLatest } from 'rxjs';
import { map, publishReplay, refCount, catchError } from 'rxjs/operators';
import { U235AstroClock } from 'u235-astro';
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

type SessionData = {
  starname: string,
  period: number,
  epoch: number,
  minMag: number,
  maxMag: number,
  names: string[],
  plotPoints: PlotPoint[][]
}

type CursorData = {
  names: string[],
  plotPoints: PlotPoint[][]
}

type ChartData = {
  starname: string,
  lineChartData: any[],
  lineChartColors: Color[]
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
  date$ = new BehaviorSubject(new Date());

  lineChartType = 'scatterWithErrorBars';
  lineChartLegend = true;
  lineChartPlugins = [ errorBars ];

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

  captureSession(): Observable<SessionData> {
    return forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.observationsService.getById(this.id)
    }).pipe(
      map(value => {
        const result = {} as SessionData;
        result.plotPoints = [];
        result.names = [];
        result.minMag = Infinity;
        result.maxMag = -Infinity;

        result.starname = value.overview.varstar;
        result.period = parseFloat(value.overview.period);
        if (isNaN(result.period)) {
          throw new Error('Phase Plot captureSession(): Period is not a number');
        }
        result.epoch = parseFloat(value.overview.epoch);
        if (isNaN(result.epoch)) {
          throw new Error('Phase Plot captureSession(): Epoch is not a number');
        }

        for (let session of value.details.sessions) {
          const dataset = createPlotPointsForSession(session, result.epoch, result.period);
          result.minMag = dataset.map(p => p.yMin).reduce((min, cur) => Math.min(min, cur), result.minMag);
          result.maxMag = dataset.map(p => p.yMax).reduce((max, cur) => Math.max(max, cur), result.maxMag);
          result.plotPoints.push(dataset);
          result.names.push(`Session: ${session.session}`);
        }

        return result;
      }),
      publishReplay(1),
      refCount()
    );
  }

  captureCursor(session: SessionData, date: Date): CursorData {
    const result = {} as CursorData;
    result.plotPoints = [];
    result.names = [];

    const avgMag = isFinite(session.minMag) ? (session.minMag + session.maxMag) / 2 : 0;
    const errMag = isFinite(session.minMag) ? (session.maxMag - session.minMag) / 2 : 1;

    let jd = U235AstroClock.calculateJD(U235AstroClock.calculateDayFraction(date), U235AstroClock.calculateJD0FromDate(date));

    result.plotPoints.push(createPlotPoints(jd, session.epoch, session.period, avgMag, errMag));
    result.names.push(`Now: ${date.toLocaleTimeString()}`);

    jd += 2 / 24;
    date = U235AstroClock.calculateDate(jd);
    result.plotPoints.push(createPlotPoints(jd, session.epoch, session.period, avgMag, errMag));
    result.names.push(`Now+2h: ${date.toLocaleTimeString()}`);

    return result;
  }

  renderChart(session: SessionData, cursor: CursorData): ChartData {
    const result = {} as ChartData;
    result.starname = session.starname;
    result.lineChartData = [];
    result.lineChartColors = [];

    for (let i = 0; i < session.names.length; i++) {
      result.lineChartData.push({
        data: session.plotPoints[i],
        label: session.names[i],
        showLine: false,
        fill: false,
        errorBarColor: 'green',
        errorBarWhiskerColor: 'green',
        errorBarWhiskerSize: 6
      });
      result.lineChartColors.push({
        borderColor: 'green',
        backgroundColor: 'rgba(255,255,0,0.28)'
      });
    }

    result.lineChartData.push({
      data: cursor.plotPoints[0],
      label: cursor.names[0],
      showLine: false,
      fill: false,
      errorBarColor: 'red',
      errorBarWhiskerColor: 'red',
      errorBarWhiskerSize: 6
    });
    result.lineChartColors.push({
      borderColor: 'red',
      backgroundColor: 'rgba(255,255,0,0.28)'
    });

    result.lineChartData.push({
      data: cursor.plotPoints[1],
      label: cursor.names[1],
      showLine: false,
      fill: false,
      errorBarColor: 'blue',
      errorBarWhiskerColor: 'blue',
      errorBarWhiskerSize: 6
    });
    result.lineChartColors.push({
      borderColor: 'blue',
      backgroundColor: 'rgba(255,255,0,0.28)'
    });

    return result;
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

    const session$ = this.loadingService.showLoadingUntilCompleted(this.captureSession().pipe(
      catchError(err => {this.messagesService.showErrors(err.message); return throwError(err); })
    ));
    const cursor$ = combineLatest(session$, this.date$).pipe(
      map(([session, date]) => this.captureCursor(session, date)),
      catchError(err => {this.messagesService.showErrors(err.message); return throwError(err); })
    );
    this.chart$ = combineLatest(session$, cursor$).pipe(
      map(([session, cursor]) => this.renderChart(session, cursor)),
      catchError(err => {this.messagesService.showErrors(err.message); return throwError(err); })
    );
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
    throw new Error('Phase Plot createPlotPointsForObservation(): Jd is not a number');
  }
  const mag = parseFloat(observation.mag);
  if (isNaN(mag)) {
    throw new Error('Phase Plot createPlotPointsForObservation(): Mag is not a number');
  }
  const err = parseFloat(observation.err);
  if (isNaN(err)) {
    throw new Error('Phase Plot createPlotPointsForObservation(): Err is not a number');
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
