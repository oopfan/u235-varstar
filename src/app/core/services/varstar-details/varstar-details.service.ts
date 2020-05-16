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

export interface Gallery {
  image: string,
  pull: string,
  content: string[]
}

export interface Details {
  gallery: Gallery[],
  sessions: Session[]
}

interface Cache {
  [id: string]: Observable<Details>
}

@Injectable({
  providedIn: 'root'
})
export class VarStarDetailsService {
  cache: Cache = {};

  constructor(private http: HttpClient) { }

  private getCache(id: string): Observable<Details> {
    if (this.cache[id] === undefined) {
      this.cache[id] = this.http.get<Details>('https://oopfan.github.io/u235-varstar/' + id + '.json').pipe(
        publishReplay(1),
        refCount()
      );
    }
    return this.cache[id];
  }

  getById(id: string): Observable<Details> {
    return this.getCache(id);
  }

}
