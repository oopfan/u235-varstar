import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

export interface Observation {
  jd: string,
  mag: string,
  err: string
}

export interface Session {
  session: string,
  filter: string,
  exposure: string,
  cstar: string,
  comment: string,
  observations: Observation[]
}

interface Cache {
  [id: string]: Observable<Session[]>
}

@Injectable({
  providedIn: 'root'
})
export class VarStarObservationsService {
  cache: Cache = {};

  constructor(private http: HttpClient) { }

  private getCache(id: string): Observable<Session[]> {
    if (this.cache[id] === undefined) {
      this.cache[id] = this.http.get<Session[]>('https://oopfan.github.io/u235-varstar/' + id + '.json').pipe(
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
