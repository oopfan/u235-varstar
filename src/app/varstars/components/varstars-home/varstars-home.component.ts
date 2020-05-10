import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VarStarOverviewService, Overviews } from '@core/services';

@Component({
  selector: 'app-varstars-home',
  templateUrl: './varstars-home.component.html',
  styleUrls: ['./varstars-home.component.css']
})
export class VarStarsHomeComponent implements OnInit, OnDestroy {
  browserTitle = 'Variable Stars | U235-VarStar';
  overviews: Overviews = null;
  overviewIds = [];
  httpError: string;
  subscription: Subscription;

  constructor(
    private titleService: Title,
    private overviewService: VarStarOverviewService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    const observable = this.overviewService.getAll();
    this.subscription = observable.subscribe({
      next: value => {
        this.overviews = value;
        this.overviewIds = Object.keys(value);
      },
      error: err => {
        this.httpError = err.message;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
