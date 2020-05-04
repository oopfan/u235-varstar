import { TestBed } from '@angular/core/testing';

import { VstarOverviewService } from './vstar-overview.service';

describe('VstarDirectoryService', () => {
  let service: VstarOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VstarOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
