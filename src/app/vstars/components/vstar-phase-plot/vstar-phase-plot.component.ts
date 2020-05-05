import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VstarOverviewService, VstarObservationsService } from '@core/services';

@Component({
  selector: 'app-vstar-phase-plot',
  templateUrl: './vstar-phase-plot.component.html',
  styleUrls: ['./vstar-phase-plot.component.css']
})
export class VstarPhasePlotComponent implements OnInit {
  id = null
  overview = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overviewService: VstarOverviewService,
    private observationsService: VstarObservationsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overviewService.getById(this.id).subscribe(overview => {
      this.overview = overview;
    });
  }

}
