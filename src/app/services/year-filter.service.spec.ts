import { TestBed, inject } from '@angular/core/testing';

import { YearFilterService } from './year-filter.service';

describe('YearFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YearFilterService]
    });
  });

  it('should be created', inject([YearFilterService], (service: YearFilterService) => {
    expect(service).toBeTruthy();
  }));
});
