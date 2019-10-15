import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearDetailsComponent } from './year-details.component';
import {DataLoaderService} from '../services/data-loader.service';
import {MaterialModule} from '../../assets/material/material.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from '../services/data.service';
import {YearsService} from '../services/years.service';

describe('YearDetailsComponent', () => {
  let component: YearDetailsComponent;
  let fixture: ComponentFixture<YearDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearDetailsComponent ],
      providers: [
        DataLoaderService,
        DataService,
        YearsService
      ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
