import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDashboardLtGasComponent } from './kpi-dashboard-lt-gas.component';

describe('KpiDashboardLtGasComponent', () => {
  let component: KpiDashboardLtGasComponent;
  let fixture: ComponentFixture<KpiDashboardLtGasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiDashboardLtGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiDashboardLtGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
