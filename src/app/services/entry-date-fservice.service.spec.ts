import { TestBed } from '@angular/core/testing';

import { EntryDateFServiceService } from './entry-date-fservice.service';

describe('EntryDateFServiceService', () => {
  let service: EntryDateFServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryDateFServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
