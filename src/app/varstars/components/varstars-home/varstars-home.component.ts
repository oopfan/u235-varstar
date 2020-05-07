import { Component, OnInit } from '@angular/core';
import { VarStarOverviewService, Overviews } from '@core/services';

@Component({
  selector: 'app-varstars-home',
  templateUrl: './varstars-home.component.html',
  styleUrls: ['./varstars-home.component.css']
})
export class VarStarsHomeComponent implements OnInit {
  overviews: Overviews = null;
  overviewIds = [];

  constructor(private overviewService: VarStarOverviewService) { }

  ngOnInit(): void {
    this.overviewService.getAll().subscribe(overviews => {
      this.overviews = overviews;
      this.overviewIds = Object.keys(overviews);
    });
  }

}
