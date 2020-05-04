import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VstarObservationsService {
  cache = {};

  constructor(private http: HttpClient) { }

  get(id: string) {
    if (this.cache[id] !== undefined) {
      return new Observable(subscriber => {
        subscriber.next(this.cache[id]);
      });
    }
    return this.http.get('https://oopfan.github.io/u235-vstar/' + id + '.json').pipe(map(value => {
      this.cache[id] = value;
      return value;
    }));
  }
}
