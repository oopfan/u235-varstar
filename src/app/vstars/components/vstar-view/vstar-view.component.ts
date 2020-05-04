import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vstar-view',
  templateUrl: './vstar-view.component.html',
  styleUrls: ['./vstar-view.component.css']
})
export class VstarViewComponent implements OnInit {
  pageTitle = 'View Vstar';
  browserTitle = this.pageTitle + ' | U235+Vstar';
  directoryEntry = null;
  observations = null;

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // this.titleService.setTitle(this.browserTitle);
    // const id = this.activatedRoute.snapshot.paramMap.get('id');

    // this.http.get('/api/get-dir').subscribe(response => {
    //   if (response[id] !== undefined) {
    //     this.directoryEntry = response[id];
    //   }
    // });

    // this.http.get('/api/get-obs?vstar=' + id).subscribe(response => {
    //   this.observations = response;
    // });

  }

}
