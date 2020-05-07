import { TestBed } from '@angular/core/testing';

import { VarStarObservationsService } from './varstar-observations.service';

describe('VarStarObservationsService', () => {
  let service: VarStarObservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarStarObservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
