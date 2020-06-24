import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, throwError, Observable } from 'rxjs';
import { VarStarOverviewService, Overview, VarStarDetailsService, Session } from '@core/services';
import { LoadingService } from '../../../loading';
import { MessagesService } from '../../../messages';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-varstar-observations',
  templateUrl: './varstar-observations.component.html',
  styleUrls: ['./varstar-observations.component.css']
})
export class VarStarObservationsComponent implements OnInit {
  browserTitle = 'Observations | U235-VarStar';
  id: string;
  overview$: Observable<Overview>;
  sessions$: Observable<Session[]>;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private observationsService: VarStarDetailsService,
    private loadingService: LoadingService,
    private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    const data$ = forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.observationsService.getById(this.id)
    }).pipe(
      catchError(err => {this.messagesService.showErrors(err.message); return throwError(err); })
    );

    const loading$ = this.loadingService.showLoadingUntilCompleted(data$);
    this.overview$ = loading$.pipe(map(value => value.overview));
    this.sessions$ = loading$.pipe(map(value => value.details.sessions));
  }

}
