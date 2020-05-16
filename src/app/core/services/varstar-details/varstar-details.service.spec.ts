import { TestBed } from '@angular/core/testing';

import { VarStarDetailsService } from './varstar-details.service';

describe('VarStarDetailsService', () => {
  let service: VarStarDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarStarDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
