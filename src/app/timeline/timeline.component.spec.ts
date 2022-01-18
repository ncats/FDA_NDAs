import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import {MaterialModule} from '../../assets/material/material.module';
import {DrugHoverService} from '../services/drug-hover.service';
import {DataService} from '../services/data.service';
import {DataLoaderService} from '../services/data-loader.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoadingService} from '../services/loading.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {TooltipComponent} from '../tooltip/tooltip.component';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TooltipComponent,
        TimelineComponent
      ],
      imports: [
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        DrugHoverService,
        DataService,
        DataLoaderService,
        LoadingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
