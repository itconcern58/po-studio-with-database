import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMonitorChartComponent } from './progress-monitor-chart.component';

describe('ProgressMonitorChartComponent', () => {
  let component: ProgressMonitorChartComponent;
  let fixture: ComponentFixture<ProgressMonitorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressMonitorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressMonitorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
