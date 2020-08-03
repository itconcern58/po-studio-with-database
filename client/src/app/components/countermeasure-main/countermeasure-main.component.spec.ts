import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountermeasureMainComponent } from './countermeasure-main.component';

describe('CountermeasureMainComponent', () => {
  let component: CountermeasureMainComponent;
  let fixture: ComponentFixture<CountermeasureMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountermeasureMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountermeasureMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
