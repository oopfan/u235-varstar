import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-varstar-view',
  templateUrl: './varstar-view.component.html',
  styleUrls: ['./varstar-view.component.css']
})
export class VarStarViewComponent implements OnInit {
  pageTitle = 'View VarStar';
  browserTitle = this.pageTitle + ' | U235+VarStar';
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

    // this.http.get('/api/get-obs?varstar=' + id).subscribe(response => {
    //   this.observations = response;
    // });

  }

}
