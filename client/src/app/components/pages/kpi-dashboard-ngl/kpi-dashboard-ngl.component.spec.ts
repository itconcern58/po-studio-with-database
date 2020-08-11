import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiDashboardNglComponent } from './kpi-dashboard-ngl.component';

describe('KpiDashboardNglComponent', () => {
  let component: KpiDashboardNglComponent;
  let fixture: ComponentFixture<KpiDashboardNglComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiDashboardNglComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiDashboardNglComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
