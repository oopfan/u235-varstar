import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { VarStarOverviewService, Overviews } from '@core/services';

@Component({
  selector: 'app-varstars-home',
  templateUrl: './varstars-home.component.html',
  styleUrls: ['./varstars-home.component.css']
})
export class VarStarsHomeComponent implements OnInit {
  browserTitle = 'Variable Stars | U235-VarStar';
  overviews: Overviews = null;
  overviewIds = [];

  constructor(
    private titleService: Title,
    private overviewService: VarStarOverviewService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.overviewService.getAll().subscribe(overviews => {
      this.overviews = overviews;
      this.overviewIds = Object.keys(overviews);
    });
  }

}
