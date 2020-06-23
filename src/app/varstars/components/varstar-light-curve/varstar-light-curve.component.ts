import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { VarStarOverviewService, Overview, VarStarDetailsService, Session } from '@core/services';
import { LoadingService } from '../../../loading';
import * as errorBars from 'chartjs-chart-error-bars/build/Chart.ErrorBars.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-varstar-light-curve',
  templateUrl: './varstar-light-curve.component.html',
  styleUrls: ['./varstar-light-curve.component.css']
})
export class VarStarLightCurveComponent implements OnInit, OnDestroy {
  browserTitle = 'Light Curve | U235-VarStar';
  id: string;
  overview: Overview = null;
  sessions: Session[] = null;
  httpError: string;
  subscription: Subscription;

  lineChartData = [];

  lineChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Magnitude vs Julian Date'
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

  calculateChart() {
    this.lineChartData = [];
    this.lineChartColors = [];
    for (let session of this.sessions) {
      let dataset = [];
      for (let observation of session.observations) {
        const jd = parseFloat(observation.jd);
        const mag = parseFloat(observation.mag);
        const err = parseFloat(observation.err);
        dataset.push(
          {
            x: jd,
            xMin: jd,
            xMax: jd,
            y: mag,
            yMin: mag - err,
            yMax: mag + err
          }
        );
      }
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
  }

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private observationsService: VarStarDetailsService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    const observable = forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.observationsService.getById(this.id)
    });
    this.subscription = this.loadingService.showLoadingUntilCompleted(observable).subscribe({
      next: value => {
        this.overview = value.overview;
        this.sessions = value.details.sessions;
        this.calculateChart();
      },
      error: err => {
        this.httpError = err.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
