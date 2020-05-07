import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarObservationsService, Session } from '@core/services';
import * as errorBars from 'chartjs-chart-error-bars/build/Chart.ErrorBars.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-varstar-light-curve',
  templateUrl: './varstar-light-curve.component.html',
  styleUrls: ['./varstar-light-curve.component.css']
})
export class VarStarLightCurveComponent implements OnInit {
  observations: Session[] = [];

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
    if (this.observations !== null) {
      for (let session of this.observations) {
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
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private observationsService: VarStarObservationsService) { }

  ngOnInit(): void {
    this.calculateChart();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.observationsService.getById(id).subscribe(observations => {
      this.observations = observations;
      this.calculateChart();
    });
  }

}
