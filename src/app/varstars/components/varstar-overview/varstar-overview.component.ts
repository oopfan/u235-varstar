import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VarStarOverviewService, Overview} from '@core/services';
import { LoadingService } from '../../../loading';

@Component({
  selector: 'app-varstar-overview',
  templateUrl: './varstar-overview.component.html',
  styleUrls: ['./varstar-overview.component.css']
})
export class VarStarOverviewComponent implements OnInit, OnDestroy {
  browserTitle = 'Overview | U235-VarStar';
  id: string;
  overview: Overview = null;
  httpError: string;
  subscription: Subscription;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.subscription = this.loadingService.showLoadingUntilCompleted(this.overviewService.getById(this.id)).subscribe({
      next: value => {
        this.overview = value;
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
