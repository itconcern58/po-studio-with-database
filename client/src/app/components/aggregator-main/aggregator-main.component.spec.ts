import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorMainComponent } from './aggregator-main.component';

describe('AggregatorComponent', () => {
  let component: AggregatorMainComponent;
  let fixture: ComponentFixture<AggregatorMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregatorMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
