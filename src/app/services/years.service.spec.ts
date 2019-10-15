import { TestBed, inject } from '@angular/core/testing';

import { YearsService } from './years.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('YearsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YearsService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([YearsService], (service: YearsService) => {
    expect(service).toBeTruthy();
  }));
});
