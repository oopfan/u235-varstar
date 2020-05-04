import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vstar-phase-plot',
  templateUrl: './vstar-phase-plot.component.html',
  styleUrls: ['./vstar-phase-plot.component.css']
})
export class VstarPhasePlotComponent implements OnInit {
  id = null

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
