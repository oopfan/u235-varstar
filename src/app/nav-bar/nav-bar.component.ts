import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  toggleBurger = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClickBurger() {
    this.toggleBurger = !this.toggleBurger;
  }
}
