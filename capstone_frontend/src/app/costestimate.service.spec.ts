import { TestBed } from '@angular/core/testing';

import { CostestimateService } from './costestimate.service';

describe('CostestimateService', () => {
  let service: CostestimateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostestimateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
