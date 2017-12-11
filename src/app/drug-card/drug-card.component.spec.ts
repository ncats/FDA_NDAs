import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugCardComponent } from './drug-card.component';

describe('DrugCardComponent', () => {
  let component: DrugCardComponent;
  let fixture: ComponentFixture<DrugCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
