import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualWarRoomDeclineCurveAnalysisComponent } from './virtual-war-room-decline-curve-analysis.component';

describe('VirtualWarRoomDeclineCurveAnalysisComponent', () => {
  let component: VirtualWarRoomDeclineCurveAnalysisComponent;
  let fixture: ComponentFixture<VirtualWarRoomDeclineCurveAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualWarRoomDeclineCurveAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualWarRoomDeclineCurveAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
