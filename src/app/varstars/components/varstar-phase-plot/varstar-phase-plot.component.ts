import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, VarStarObservationsService, Overview, Session, Observation } from '@core/services';
import * as errorBars from 'chartjs-chart-error-bars/build/Chart.ErrorBars.js';
import { Color } from 'ng2-charts';
import { interval } from 'rxjs';

function Phase1(jd: number, epoch: number, period: number): number {
  return ((jd - epoch) % period) / period;
}

function Phase2(phase1: number): number {
  return phase1 - Math.sign(phase1);
}

function createPlotPoint(phase: number, mag: number, err: number) {
  return {
    x: phase,
    xMin: phase,
    xMax: phase,
    y: mag,
    yMin: mag - err,
    yMax: mag + err
  };
}

function createPlotPoints(jd: number, epoch: number, period: number, mag: number, err: number) {
  const phase1 = Phase1(jd, epoch, period);
  const phase2 = Phase2(phase1);
  return [
    createPlotPoint(phase1, mag, err),
    createPlotPoint(phase2, mag, err)
  ];
}

function createPlotPointsForObservation(observation: Observation, epoch: number, period: number) {
  const jd = parseFloat(observation.jd);
  const mag = parseFloat(observation.mag);
  const err = parseFloat(observation.err);
  return createPlotPoints(jd, epoch, period, mag, err);
}

function createPlotPointsForSession(session: Session, epoch: number, period: number) {
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

@Component({
  selector: 'app-varstar-phase-plot',
  templateUrl: './varstar-phase-plot.component.html',
  styleUrls: ['./varstar-phase-plot.component.css']
})
export class VarStarPhasePlotComponent implements OnInit {
  browserTitle = 'Phase Plot | U235-VarStar';
  id: string;
  overview: Overview = null;
  overviewHttpError: string;
  observations: Session[] = null;
  observationsHttpError: string;

  lineChartData = [];

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

  lineChartColors: Color[] = [];

  lineChartLegend = true;
  lineChartPlugins = [ errorBars ];
  lineChartType = 'scatterWithErrorBars';

  calculateCursor(jdOff: number, epoch: number, period: number, mag: number, err: number, color: any, labelPrefix: string) {
    let date = new Date();
    let jd0 = calculateJD0FromDate(date);
    const jd = calculateJD(date, jd0) + jdOff;
    date = calculateDate(jd);
    const cursor = createPlotPoints(jd, epoch, period, mag, err);
    return {
      data: cursor,
      label: labelPrefix + date.toLocaleTimeString(),
      showLine: false,
      fill: false,
      errorBarColor: color,
      errorBarWhiskerColor: color,
      errorBarWhiskerSize: 6
    }
  }

  calculateChart() {
    this.lineChartData = [];
    this.lineChartColors = [];
    const period = parseFloat(this.overview.period);
    const epoch = parseFloat(this.overview.epoch);
    if (!isNaN(period) && !isNaN(epoch)) {
      let minMag = Infinity;
      let maxMag = -Infinity;
      for (let session of this.observations) {
        const dataset = createPlotPointsForSession(session, epoch, period);
        minMag = dataset.map(p => p.yMin).reduce((min, cur) => Math.min(min, cur), minMag);
        maxMag = dataset.map(p => p.yMax).reduce((max, cur) => Math.max(max, cur), maxMag);
        this.lineChartData.push(
          {
            data: dataset,
            label: 'Session: ' + session.session,
            showLine: false,
            fill: false,
            errorBarColor: 'green',
            errorBarWhiskerColor: 'green',
            errorBarWhiskerSize: 6
          }
        );
        this.lineChartColors.push(
          {
            borderColor: 'green',
            backgroundColor: 'rgba(255,255,0,0.28)'
          }
        );
      }
      let cursor = this.calculateCursor(0, epoch, period, (minMag + maxMag) / 2, (maxMag - minMag) / 2, 'red', 'Now: ');
      this.lineChartData.push(cursor);
      this.lineChartColors.push(
        {
          borderColor: 'red',
          backgroundColor: 'rgba(255,255,0,0.28)'
        }
      );
      cursor = this.calculateCursor(2 / 24, epoch, period, (minMag + maxMag) / 2, (maxMag - minMag) / 2, 'blue', 'Now+2h: ');
      this.lineChartData.push(cursor);
      this.lineChartColors.push(
        {
          borderColor: 'blue',
          backgroundColor: 'rgba(255,255,0,0.28)'
        }
      );
    }
  }

  updateTime() {
    if (this.overview && this.observations) {
      this.calculateChart();
    }
  }

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private observationsService: VarStarObservationsService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overviewService.getById(this.id).subscribe(overview => {
      this.overview = overview;
      if (this.observations) {
        this.calculateChart();
      }
    }, err => {
      this.overviewHttpError = err.message;
    });
    this.observationsService.getById(this.id).subscribe(observations => {
      this.observations = observations;
      if (this.overview) {
        this.calculateChart();
      }
    }, err => {
      this.observationsHttpError = err.message;
    });
  }

}
