import { TestBed } from '@angular/core/testing';

import { AdminConstructorService } from './admin-constructor.service';

describe('AdminConstructorService', () => {
  let service: AdminConstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminConstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
