import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LoadingService]
})
export class AppComponent implements OnInit {
  title = 'u235-varstar';
  response = null;

  constructor(private http: HttpClient, private loadingService: LoadingService) {}

  ngOnInit(): void {
    // this.http.get('/api/get-dir').subscribe(response => {
    //   this.response = response;
    // });
  }
}
