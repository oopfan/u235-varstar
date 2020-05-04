import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vstar-observations',
  templateUrl: './vstar-observations.component.html',
  styleUrls: ['./vstar-observations.component.css']
})
export class VstarObservationsComponent implements OnInit {
  id = null
  observations = null;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get('/api/get-obs?vstar=' + this.id).subscribe(response => {
      this.observations = response;
    });
  }

}
