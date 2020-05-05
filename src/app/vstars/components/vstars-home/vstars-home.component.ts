import { Component, OnInit } from '@angular/core';
import { VstarOverviewService } from '@core/services';

@Component({
  selector: 'app-vstars-home',
  templateUrl: './vstars-home.component.html',
  styleUrls: ['./vstars-home.component.css']
})
export class VstarsHomeComponent implements OnInit {
  overviews = null;
  overviewIds = [];

  constructor(private overviewService: VstarOverviewService) { }

  ngOnInit(): void {
    this.overviewService.getAll().subscribe(overviews => {
      this.overviews = overviews;
      this.overviewIds = Object.keys(overviews);
    });
  }

}
