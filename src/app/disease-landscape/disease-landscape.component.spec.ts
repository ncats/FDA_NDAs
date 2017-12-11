import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseLandscapeComponent } from './disease-landscape.component';

describe('DiseaseLandscapeComponent', () => {
  let component: DiseaseLandscapeComponent;
  let fixture: ComponentFixture<DiseaseLandscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseaseLandscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseLandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
