import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugCountsComponent } from './drug-counts.component';

describe('DrugCountsComponent', () => {
  let component: DrugCountsComponent;
  let fixture: ComponentFixture<DrugCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugCountsComponent ]
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
