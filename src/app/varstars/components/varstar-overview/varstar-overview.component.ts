import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { VarStarOverviewService, Overview} from '@core/services';
import { LoadingService } from '../../../loading';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-varstar-overview',
  templateUrl: './varstar-overview.component.html',
  styleUrls: ['./varstar-overview.component.css']
})
export class VarStarOverviewComponent implements OnInit {
  browserTitle = 'Overview | U235-VarStar';
  id: string;
  overview$: Observable<Overview>;
  httpError: string;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.overview$ = this.loadingService.showLoadingUntilCompleted(this.overviewService.getById(this.id)).pipe(
      catchError(err => {this.httpError = err.message; return throwError(err); })
    );
  }

}
