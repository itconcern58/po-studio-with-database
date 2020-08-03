import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressMonitorMainComponent } from './progress-monitor-main.component';

describe('ProgressMonitorMainComponent', () => {
  let component: ProgressMonitorMainComponent;
  let fixture: ComponentFixture<ProgressMonitorMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressMonitorMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressMonitorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
