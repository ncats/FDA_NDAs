import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugDetailsComponent } from './drug-details.component';

describe('DrugDetailsComponent', () => {
  let component: DrugDetailsComponent;
  let fixture: ComponentFixture<DrugDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugDetailsComponent ]
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
