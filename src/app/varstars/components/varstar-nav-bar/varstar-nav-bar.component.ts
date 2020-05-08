import { Component, OnInit, Input } from '@angular/core';
import { Overview } from '@core/services';

@Component({
  selector: 'app-varstar-nav-bar',
  templateUrl: './varstar-nav-bar.component.html',
  styleUrls: ['./varstar-nav-bar.component.css']
})
export class VarStarNavBarComponent implements OnInit {
  @Input() overview: Overview;
  @Input() id: string;

  constructor() { }

  ngOnInit(): void {
  }

}
