import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, VarStarObservationsService, Overview, Session } from '@core/services';
import * as errorBars from 'chartjs-chart-error-bars/build/Chart.ErrorBars.js';
import { Color } from 'ng2-charts';

function Phase1(jd: number, epoch: number, period: number): number {
  return ((jd - epoch) % period) / period;
}

function Phase2(phase1: number): number {
  return phase1 - Math.sign(phase1);
}

@Component({
  selector: 'app-varstar-phase-plot',
  templateUrl: './varstar-phase-plot.component.html',
  styleUrls: ['./varstar-phase-plot.component.css']
})
export class VarStarPhasePlotComponent implements OnInit {
  browserTitle = 'Phase Plot | U235-VarStar';
  overview: Overview = null;
  observations: Session[] = [];

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

  calculateChart() {
    this.lineChartData = [];
    this.lineChartColors = [];
    if (this.overview !== null) {
      const period = parseFloat(this.overview.period);
      const epoch = parseFloat(this.overview.epoch);
      for (let session of this.observations) {
        let dataset = [];
        for (let observation of session.observations) {
          const jd = parseFloat(observation.jd);
          const mag = parseFloat(observation.mag);
          const err = parseFloat(observation.err);
          let phase1 = Phase1(jd, epoch, period);
          let phase2 = Phase2(phase1);
          dataset.push(
            {
              x: phase1,
              xMin: phase1,
              xMax: phase1,
              y: mag,
              yMin: mag - err,
              yMax: mag + err
            }
          );
          dataset.push(
            {
              x: phase2,
              xMin: phase2,
              xMax: phase2,
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
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private observationsService: VarStarObservationsService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.calculateChart();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overviewService.getById(id).subscribe(overview => {
      this.overview = overview;
      this.calculateChart();
    });

    this.observationsService.getById(id).subscribe(observations => {
      this.observations = observations;
      this.calculateChart();
    });
  }

}
