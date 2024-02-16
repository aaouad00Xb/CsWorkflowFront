import { TestBed } from '@angular/core/testing';

import { StepFeildsfService } from './step-feildsf.service';

describe('StepFeildsfService', () => {
  let service: StepFeildsfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepFeildsfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
