import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-varstar-nav-bar',
  templateUrl: './varstar-nav-bar.component.html',
  styleUrls: ['./varstar-nav-bar.component.css']
})
export class VarStarNavBarComponent implements OnInit {
  @Input() starname: string;
  @Input() id: string;

  constructor() { }

  ngOnInit(): void {
  }

}
