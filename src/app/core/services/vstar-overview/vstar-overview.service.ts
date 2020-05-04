import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VstarOverviewService {

  constructor(private http: HttpClient) { }

  get(id: string) {
    return this.http.get('https://oopfan.github.io/u235-vstar/dir.json').pipe(map(value => value[id]));
  }
}
