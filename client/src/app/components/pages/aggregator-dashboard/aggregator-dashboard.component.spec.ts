import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorDashboardComponent } from './aggregator-dashboard.component';

describe('AggregatorDashboardComponent', () => {
  let component: AggregatorDashboardComponent;
  let fixture: ComponentFixture<AggregatorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
