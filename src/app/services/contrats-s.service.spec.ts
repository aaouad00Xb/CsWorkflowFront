import { TestBed } from '@angular/core/testing';

import { ContratsSService } from './contrats-s.service';

describe('ContratsSService', () => {
  let service: ContratsSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratsSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
