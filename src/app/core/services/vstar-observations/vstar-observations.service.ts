import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

export interface Observation {
  jd: string,
  mag: string,
  err: string
}

export interface ObservationArray {
  [index: number]: Observation
}

export interface Session {
  session: string,
  filter: string,
  exposure: string,
  cstar: string,
  comment: string,
  observations: Observation[]
}

export interface SessionArray {
  [index: number]: Session
}

interface Cache {
  [id: string]: Observable<Session[]>
}

@Injectable({
  providedIn: 'root'
})
export class VstarObservationsService {
  cache: Cache = {};

  constructor(private http: HttpClient) { }

  private getCache(id: string): Observable<Session[]> {
    if (this.cache[id] === undefined) {
      this.cache[id] = this.http.get<Session[]>('https://oopfan.github.io/u235-vstar/' + id + '.json').pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.cache[id];
  }

  getById(id: string): Observable<Session[]> {
    return this.getCache(id);
  }

}
