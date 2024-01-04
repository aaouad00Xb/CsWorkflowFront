import { TestBed } from '@angular/core/testing';

import { PoleServiceService } from './pole-service.service';

describe('PoleServiceService', () => {
  let service: PoleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
