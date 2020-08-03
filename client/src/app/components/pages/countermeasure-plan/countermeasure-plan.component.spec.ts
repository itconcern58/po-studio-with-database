import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountermeasurePlanComponent } from './countermeasure-plan.component';

describe('CountermeasurePlanComponent', () => {
  let component: CountermeasurePlanComponent;
  let fixture: ComponentFixture<CountermeasurePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountermeasurePlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountermeasurePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
