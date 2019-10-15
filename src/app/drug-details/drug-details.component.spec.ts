import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDetailsComponent } from './drug-details.component';
import {MaterialModule} from '../../assets/material/material.module';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataService} from '../services/data.service';
import {DataLoaderService} from '../services/data-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('DrugDetailsComponent', () => {
  let component: DrugDetailsComponent;
  let fixture: ComponentFixture<DrugDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDetailsComponent ],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        DrugHoverService,
        DataService,
        DataLoaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
