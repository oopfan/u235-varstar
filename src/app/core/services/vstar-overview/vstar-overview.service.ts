import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

export interface Overview {
  vstar: string,
  vtype: string,
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
export class VstarOverviewService {
  cache: Observable<Overviews>;

  constructor(private http: HttpClient) { }

  private getCache(): Observable<Overviews> {
    if (!this.cache) {
      this.cache = this.http.get<Overviews>('https://oopfan.github.io/u235-vstar/dir.json').pipe(
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
