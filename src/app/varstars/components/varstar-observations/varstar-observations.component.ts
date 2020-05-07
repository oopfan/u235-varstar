import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarObservationsService, Session } from '@core/services';

@Component({
  selector: 'app-varstar-observations',
  templateUrl: './varstar-observations.component.html',
  styleUrls: ['./varstar-observations.component.css']
})
export class VarStarObservationsComponent implements OnInit {
  observations: Session[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private observationsService: VarStarObservationsService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.observationsService.getById(id).subscribe(observations => {
      this.observations = observations;
    });
  }

}
