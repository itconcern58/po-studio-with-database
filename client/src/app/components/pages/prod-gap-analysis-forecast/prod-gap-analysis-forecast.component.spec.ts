import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdGapAnalysisForecastComponent } from './prod-gap-analysis-forecast.component';

describe('ProdGapAnalysisForecastComponent', () => {
  let component: ProdGapAnalysisForecastComponent;
  let fixture: ComponentFixture<ProdGapAnalysisForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdGapAnalysisForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdGapAnalysisForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
