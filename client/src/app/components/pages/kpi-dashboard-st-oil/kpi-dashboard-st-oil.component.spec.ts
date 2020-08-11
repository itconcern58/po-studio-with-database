import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDashboardStOilComponent } from './kpi-dashboard-st-oil.component';

describe('KpiDashboardStOilComponent', () => {
  let component: KpiDashboardStOilComponent;
  let fixture: ComponentFixture<KpiDashboardStOilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiDashboardStOilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiDashboardStOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
