import { TestBed } from '@angular/core/testing';

import { StepFeildsService } from './step-feilds.service';

describe('StepFeildsService', () => {
  let service: StepFeildsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepFeildsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
