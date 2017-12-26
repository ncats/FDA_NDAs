import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCountsComponent } from './time-counts.component';

describe('TimeCountsComponent', () => {
  let component: TimeCountsComponent;
  let fixture: ComponentFixture<TimeCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeCountsComponent ]
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
