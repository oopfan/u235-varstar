import { TestBed } from '@angular/core/testing';

import { VarStarOverviewService } from './varstar-overview.service';

describe('VarStarDirectoryService', () => {
  let service: VarStarOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarStarOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
