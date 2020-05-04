import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VstarObservationsService } from '@core/services';

@Component({
  selector: 'app-vstar-observations',
  templateUrl: './vstar-observations.component.html',
  styleUrls: ['./vstar-observations.component.css']
})
export class VstarObservationsComponent implements OnInit {
  id = null;
  observations = null;

  constructor(private activatedRoute: ActivatedRoute, private service: VstarObservationsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.get(this.id).subscribe(observations => {
      this.observations = observations;
    });
  }

}
