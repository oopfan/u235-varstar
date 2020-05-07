import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService, Overview} from '@core/services';

@Component({
  selector: 'app-varstar-overview',
  templateUrl: './varstar-overview.component.html',
  styleUrls: ['./varstar-overview.component.css']
})
export class VarStarOverviewComponent implements OnInit {
  overview: Overview = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: VarStarOverviewService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getById(id).subscribe(overview => {
      this.overview = overview;
    });
  }

}
