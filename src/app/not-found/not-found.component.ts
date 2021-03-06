import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  browserTitle = 'Page Not Found | U235-VarStar';

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
  }

}
