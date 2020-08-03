import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDashboardLtOilComponent } from './kpi-dashboard-lt-oil.component';

describe('KpiDashboardLtOilComponent', () => {
  let component: KpiDashboardLtOilComponent;
  let fixture: ComponentFixture<KpiDashboardLtOilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiDashboardLtOilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiDashboardLtOilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
