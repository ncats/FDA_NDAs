import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugChartsComponent } from './drug-charts.component';

describe('DrugChartsComponent', () => {
  let component: DrugChartsComponent;
  let fixture: ComponentFixture<DrugChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugChartsComponent ]
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
