import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugCountsComponent } from './drug-counts.component';
import {MaterialModule} from '../../assets/material/material.module';
import {DataLoaderService} from '../services/data-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from '../services/data.service';

describe('DrugCountsComponent', () => {
  let component: DrugCountsComponent;
  let fixture: ComponentFixture<DrugCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugCountsComponent ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        DataLoaderService,
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
