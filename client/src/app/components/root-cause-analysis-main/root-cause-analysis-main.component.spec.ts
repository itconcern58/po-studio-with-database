import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootCauseAnalysisMainComponent } from './root-cause-analysis-main.component';

describe('RootCauseAnalysisMainComponent', () => {
  let component: RootCauseAnalysisMainComponent;
  let fixture: ComponentFixture<RootCauseAnalysisMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootCauseAnalysisMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootCauseAnalysisMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
