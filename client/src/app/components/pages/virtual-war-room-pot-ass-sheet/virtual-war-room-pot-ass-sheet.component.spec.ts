import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualWarRoomPotAssSheetComponent } from './virtual-war-room-pot-ass-sheet.component';

describe('VirtualWarRoomPotAssSheetComponent', () => {
  let component: VirtualWarRoomPotAssSheetComponent;
  let fixture: ComponentFixture<VirtualWarRoomPotAssSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualWarRoomPotAssSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualWarRoomPotAssSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
