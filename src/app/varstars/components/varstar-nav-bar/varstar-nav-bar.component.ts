import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, Overview } from '@core/services';

@Component({
  selector: 'app-varstar-nav-bar',
  templateUrl: './varstar-nav-bar.component.html',
  styleUrls: ['./varstar-nav-bar.component.css']
})
export class VarStarNavBarComponent implements OnInit {
  id = null;
  overview: Overview = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overviewService.getById(this.id).subscribe(overview => {
      this.overview = overview;
    });
  }

}
