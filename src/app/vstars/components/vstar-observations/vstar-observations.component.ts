import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VstarOverviewService, VstarObservationsService } from '@core/services';

@Component({
  selector: 'app-vstar-observations',
  templateUrl: './vstar-observations.component.html',
  styleUrls: ['./vstar-observations.component.css']
})
export class VstarObservationsComponent implements OnInit {
  id = null;
  overview = null;
  observations = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overviewService: VstarOverviewService,
    private observationsService: VstarObservationsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overviewService.getById(this.id).subscribe(overview => {
      this.overview = overview;
    });
    this.observationsService.get(this.id).subscribe(observations => {
      this.observations = observations;
    });
  }

}
