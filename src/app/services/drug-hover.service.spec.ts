import { TestBed, inject } from '@angular/core/testing';

import { DrugHoverService } from './drug-hover.service';

describe('DrugHoverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrugHoverService]
    });
  });

  it('should be created', inject([DrugHoverService], (service: DrugHoverService) => {
    expect(service).toBeTruthy();
  }));
});
