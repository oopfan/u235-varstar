import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, Overview, VarStarObservationsService, Session } from '@core/services';

@Component({
  selector: 'app-varstar-observations',
  templateUrl: './varstar-observations.component.html',
  styleUrls: ['./varstar-observations.component.css']
})
export class VarStarObservationsComponent implements OnInit {
  browserTitle = 'Observations | U235-VarStar';
  id: string;
  overview: Overview = null;
  overviewHttpError: string;
  observations: Session[] = null;
  observationsHttpError: string;

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
    }, err => {
      this.overviewHttpError = err.message;
    });
    this.observationsService.getById(this.id).subscribe(observations => {
      this.observations = observations;
    }, err => {
      this.observationsHttpError = err.message;
    });
  }

}
