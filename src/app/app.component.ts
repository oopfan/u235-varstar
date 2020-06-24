import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading';
import { MessagesService } from './messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ]
})
export class AppComponent {
  title = 'u235-varstar';
  response = null;

  constructor(private http: HttpClient) {}

}
