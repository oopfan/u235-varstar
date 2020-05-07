import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VarStarOverviewService} from '@core/services';

@Component({
  selector: 'app-varstar-overview',
  templateUrl: './varstar-overview.component.html',
  styleUrls: ['./varstar-overview.component.css']
})
export class VarStarOverviewComponent implements OnInit {
  id = null;
  overview = null;

  constructor(private activatedRoute: ActivatedRoute, private service: VarStarOverviewService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.service.getById(this.id).subscribe(overview => {
      this.overview = overview;
    });
  }

}
