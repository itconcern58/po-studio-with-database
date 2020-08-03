import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaAssessmentSheetComponent } from './rca-assessment-sheet.component';

describe('RcaAssessmentSheetComponent', () => {
  let component: RcaAssessmentSheetComponent;
  let fixture: ComponentFixture<RcaAssessmentSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcaAssessmentSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcaAssessmentSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
