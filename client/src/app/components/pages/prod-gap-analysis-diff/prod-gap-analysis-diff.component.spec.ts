import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdGapAnalysisDiffComponent } from './prod-gap-analysis-diff.component';

describe('ProdGapAnalysisDiffComponent', () => {
  let component: ProdGapAnalysisDiffComponent;
  let fixture: ComponentFixture<ProdGapAnalysisDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdGapAnalysisDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdGapAnalysisDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
