import { TestBed } from '@angular/core/testing';

import { DivisionserviceService } from './divisionservice.service';

describe('DivisionserviceService', () => {
  let service: DivisionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivisionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
