import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, VarStarObservationsService, Overview, Session } from '@core/services';

@Component({
  selector: 'app-varstar-observations',
  templateUrl: './varstar-observations.component.html',
  styleUrls: ['./varstar-observations.component.css']
})
export class VarStarObservationsComponent implements OnInit {
  id = null;
  overview: Overview = null;
  observations: Session[] = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private observationsService: VarStarObservationsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overviewService.getById(this.id).subscribe(overview => {
      this.overview = overview;
    });
    this.observationsService.getById(this.id).subscribe(observations => {
      this.observations = observations;
    });
  }

}
