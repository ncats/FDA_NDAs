import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import {DataLoaderService} from './data-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        DataLoaderService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
