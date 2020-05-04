import { TestBed } from '@angular/core/testing';

import { VstarObservationsService } from './vstar-observations.service';

describe('VstarObservationsService', () => {
  let service: VstarObservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VstarObservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
