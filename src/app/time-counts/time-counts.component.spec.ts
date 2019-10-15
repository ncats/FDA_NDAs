import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCountsComponent } from './time-counts.component';
import {DataLoaderService} from '../services/data-loader.service';
import {MaterialModule} from '../../assets/material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from '../services/data.service';

describe('TimeCountsComponent', () => {
  let component: TimeCountsComponent;
  let fixture: ComponentFixture<TimeCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCountsComponent ],
      providers: [
        DataLoaderService,
        DataService
      ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
