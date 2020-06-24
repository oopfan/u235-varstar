import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount, delay } from 'rxjs/operators';

export interface Overview {
  varstar: string,
  vartype: string,
  constellation: string,
  ra2000: string,
  de2000: string,
  period: string,
  epoch: string
}

export interface Overviews {
  [id: string]: Overview
}

@Injectable({
  providedIn: 'root'
})
export class VarStarOverviewService {
  cache: Observable<Overviews>;

  constructor(private http: HttpClient) { }

  private getCache(): Observable<Overviews> {
    if (!this.cache) {
      this.cache = this.http.get<Overviews>('https://oopfan.github.io/u235-varstar/dir.json').pipe(
        delay(2000),
        publishReplay(1),
        refCount()
      );
    }
    return this.cache;
  }

  getAll(): Observable<Overviews> {
    return this.getCache();
  }

  getById(id: string): Observable<Overview> {
    return this.getCache().pipe(map(overviews => overviews[id]));
  }

}
