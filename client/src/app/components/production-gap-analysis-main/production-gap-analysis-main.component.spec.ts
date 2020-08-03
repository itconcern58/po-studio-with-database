import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionGapAnalysisMainComponent } from './production-gap-analysis-main.component';

describe('ProductionGapAnalysisMainComponent', () => {
  let component: ProductionGapAnalysisMainComponent;
  let fixture: ComponentFixture<ProductionGapAnalysisMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionGapAnalysisMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionGapAnalysisMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
