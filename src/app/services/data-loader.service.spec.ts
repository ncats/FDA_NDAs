import { TestBed, inject } from '@angular/core/testing';

import { DataLoaderService } from './data-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DataLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataLoaderService],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([DataLoaderService], (service: DataLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
