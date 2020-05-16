import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { VarStarOverviewService, Overview, VarStarDetailsService, Gallery } from '@core/services';

@Component({
  selector: 'app-varstar-gallery',
  templateUrl: './varstar-gallery.component.html',
  styleUrls: ['./varstar-gallery.component.css']
})
export class VarStarGalleryComponent implements OnInit, OnDestroy {
  browserTitle = 'Gallery | U235-VarStar';
  id: string;
  overview: Overview = null;
  gallery: Gallery[] = null;
  galleryUrl = "https://oopfan.github.io/u235-varstar/";
  httpError: string;
  subscription: Subscription;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private overviewService: VarStarOverviewService,
    private detailsService: VarStarDetailsService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    const observable = forkJoin({
      overview: this.overviewService.getById(this.id),
      details: this.detailsService.getById(this.id)
    });
    this.subscription = observable.subscribe({
      next: value => {
        this.overview = value.overview;
        this.gallery = value.details.gallery;
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
