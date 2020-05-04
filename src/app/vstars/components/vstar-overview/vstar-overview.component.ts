import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vstar-overview',
  templateUrl: './vstar-overview.component.html',
  styleUrls: ['./vstar-overview.component.css']
})
export class VstarOverviewComponent implements OnInit {
  id = null;
  directoryEntry = null;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.http.get('/api/get-dir').subscribe(response => {
      if (response[this.id] !== undefined) {
        this.directoryEntry = response[this.id];
      }
    });
  }

}
