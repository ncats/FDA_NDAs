import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPanelComponent } from './filter-panel.component';
import {MaterialModule} from '../../assets/material/material.module';
import {DataService} from '../services/data.service';
import {DataLoaderService} from '../services/data-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPanelComponent ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        DataService,
        DataLoaderService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
