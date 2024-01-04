import { TestBed } from '@angular/core/testing';

import { EntryDateServiceService } from './entry-date-service.service';

describe('EntryDateServiceService', () => {
  let service: EntryDateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryDateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
