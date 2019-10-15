import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugChartsComponent } from './drug-charts.component';
import {LoadingService} from '../services/loading.service';
import {MaterialModule} from '../../assets/material/material.module';
import {DataService} from '../services/data.service';
import {DataLoaderService} from '../services/data-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DrugChartsComponent', () => {
  let component: DrugChartsComponent;
  let fixture: ComponentFixture<DrugChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugChartsComponent ],
      providers: [
        LoadingService,
        DataService,
        DataLoaderService
      ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
