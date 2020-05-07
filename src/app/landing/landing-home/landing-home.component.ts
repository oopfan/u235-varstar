import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css']
})
export class LandingHomeComponent implements OnInit {
  browserTitle = 'Home | U235-VarStar';

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.browserTitle);
  }

}
