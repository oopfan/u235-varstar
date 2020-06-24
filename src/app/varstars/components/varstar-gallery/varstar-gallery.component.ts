import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, VarStarDetailsService, Overview, Gallery } from '@core/services';
import { LoadingService } from '../../../loading';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-varstar-gallery',
  templateUrl: './varstar-gallery.component.html',
  styleUrls: ['./varstar-gallery.component.css']
})
export class VarStarGalleryComponent implements OnInit {
  browserTitle = 'Gallery | U235-VarStar';
  id: string;
  galleryUrl = "https://oopfan.github.io/u235-varstar/";

  httpError: string;
  overview$: Observable<Overview>;
  gallery$: Observable<Gallery[]>;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private detailsService: VarStarDetailsService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    const data$ = forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.detailsService.getById(this.id)
    }).pipe(
      catchError(err => {this.httpError = err.message; return throwError(err); })
    );

    const loading$ = this.loadingService.showLoadingUntilCompleted(data$);
    this.overview$ = loading$.pipe(pluck("overview"));
    this.gallery$ = loading$.pipe(pluck("details"), pluck("gallery"));
  }

}
