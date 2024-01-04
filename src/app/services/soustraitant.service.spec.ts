import { TestBed } from '@angular/core/testing';

import { SoustraitantService } from './soustraitant.service';

describe('SoustraitantService', () => {
  let service: SoustraitantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoustraitantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
