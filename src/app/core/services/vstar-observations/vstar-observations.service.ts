import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VstarObservationsService {

  constructor(private http: HttpClient) { }

  get(id: string) {
    return this.http.get('https://oopfan.github.io/u235-vstar/' + id + '.json');
  }
}
