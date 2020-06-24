import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, throwError, Observable } from 'rxjs';
import { VarStarOverviewService, Overview, VarStarDetailsService, Session } from '@core/services';
import { LoadingService } from '../../../loading';
import { MessagesService } from '../../../messages';
import * as errorBars from 'chartjs-chart-error-bars/build/Chart.ErrorBars.js';
import { Color } from 'ng2-charts';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-varstar-light-curve',
  templateUrl: './varstar-light-curve.component.html',
  styleUrls: ['./varstar-light-curve.component.css']
})
export class VarStarLightCurveComponent implements OnInit {
  browserTitle = 'Light Curve | U235-VarStar';
  id: string;
  overview$: Observable<Overview>;
  sessions$: Observable<Session[]>;

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

  calculateChart(sessions: Session[]) {
    this.lineChartData = [];
    this.lineChartColors = [];
    for (let session of sessions) {
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
    private loadingService: LoadingService,
    private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    const data$ = forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.observationsService.getById(this.id)
    }).pipe(
      catchError(err => {this.messagesService.showErrors(err.message); return throwError(err); })
    );

    const loading$ = this.loadingService.showLoadingUntilCompleted(data$);
    this.overview$ = loading$.pipe(map(value => value.overview));
    this.sessions$ = loading$.pipe(map(value => {
      const sessions = value.details.sessions;
      this.calculateChart(sessions);
      return sessions;
    }));
  }

}
