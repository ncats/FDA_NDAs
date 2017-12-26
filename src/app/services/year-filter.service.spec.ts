import { TestBed, inject } from '@angular/core/testing';

import { YearDataService } from './year-filter.service';

describe('YearDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YearDataService]
    });
  });

  it('should be created', inject([YearDataService], (service: YearDataService) => {
    expect(service).toBeTruthy();
  }));
});
