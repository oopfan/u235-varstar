import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { VarStarOverviewService, Overview, VarStarObservationsService, Session } from '@core/services';

@Component({
  selector: 'app-varstar-observations',
  templateUrl: './varstar-observations.component.html',
  styleUrls: ['./varstar-observations.component.css']
})
export class VarStarObservationsComponent implements OnInit, OnDestroy {
  browserTitle = 'Observations | U235-VarStar';
  id: string;
  overview: Overview = null;
  observations: Session[] = null;
  httpError: string;
  subscription: Subscription;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private observationsService: VarStarObservationsService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    const observable = forkJoin({
      overview: this.overviewService.getById(this.id),
      observations: this.observationsService.getById(this.id)
    });
    this.subscription = observable.subscribe({
      next: value => {
        this.overview = value.overview;
        this.observations = value.observations;
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
