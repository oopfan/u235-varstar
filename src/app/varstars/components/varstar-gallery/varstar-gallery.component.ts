import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, VarStarDetailsService, Gallery } from '@core/services';
import { forkJoin, of, concat, Observable } from 'rxjs';
import { catchError, pluck, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-varstar-gallery',
  templateUrl: './varstar-gallery.component.html',
  styleUrls: ['./varstar-gallery.component.css']
})
export class VarStarGalleryComponent implements OnInit {
  browserTitle = 'Gallery | U235-VarStar';
  id: string;
  galleryUrl = "https://oopfan.github.io/u235-varstar/";

  error: string;
  loading$: Observable<boolean>;
  varstar$: Observable<string>;
  gallery$: Observable<Gallery[]>;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private detailsService: VarStarDetailsService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    const data$ = forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.detailsService.getById(this.id)
    }).pipe(
      catchError(err => {
        this.error = err.message;
        return of({});
      })
    );

    const loadingOne$ = of(true);
    const loadingTwo$ = data$.pipe(mapTo(false));
    this.loading$ = concat(loadingOne$, loadingTwo$);

    this.varstar$ = data$.pipe(pluck("overview"), pluck("varstar"));
    this.gallery$ = data$.pipe(pluck("details"), pluck("gallery"));
  }

}
