import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VstarOverviewService} from '@core/services';

@Component({
  selector: 'app-vstar-overview',
  templateUrl: './vstar-overview.component.html',
  styleUrls: ['./vstar-overview.component.css']
})
export class VstarOverviewComponent implements OnInit {
  id = null;
  overview = null;

  constructor(private activatedRoute: ActivatedRoute, private service: VstarOverviewService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getById(this.id).subscribe(overview => {
      this.overview = overview;
    });
  }

}
