import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTrackerSheetComponent } from './action-tracker-sheet.component';

describe('ActionTrackerSheetComponent', () => {
  let component: ActionTrackerSheetComponent;
  let fixture: ComponentFixture<ActionTrackerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionTrackerSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTrackerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
