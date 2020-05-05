import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VstarOverviewService, VstarObservationsService } from '@core/services';

@Component({
  selector: 'app-vstar-light-curve',
  templateUrl: './vstar-light-curve.component.html',
  styleUrls: ['./vstar-light-curve.component.css']
})
export class VstarLightCurveComponent implements OnInit {
  id = null
  overview = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overviewService: VstarOverviewService,
    private observationsService: VstarObservationsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overviewService.get(this.id).subscribe(overview => {
      this.overview = overview;
    });
  }

}
