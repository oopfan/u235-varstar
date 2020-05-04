import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vstar-light-curve',
  templateUrl: './vstar-light-curve.component.html',
  styleUrls: ['./vstar-light-curve.component.css']
})
export class VstarLightCurveComponent implements OnInit {
  id = null

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
