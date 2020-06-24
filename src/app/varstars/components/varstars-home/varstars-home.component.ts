import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { VarStarOverviewService, Overviews } from '@core/services';
import { LoadingService } from '../../../loading';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-varstars-home',
  templateUrl: './varstars-home.component.html',
  styleUrls: ['./varstars-home.component.css']
})
export class VarStarsHomeComponent implements OnInit {
  browserTitle = 'Variable Stars | U235-VarStar';
  overviews$: Observable<Overviews>;
  httpError: string;
  objectKeys = Object.keys;

  constructor(
    private titleService: Title,
    private overviewService: VarStarOverviewService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
    this.overviews$ = this.loadingService.showLoadingUntilCompleted(this.overviewService.getAll()).pipe(
      catchError(err => {this.httpError = err.message; return throwError(err); })
    );
  }

}
