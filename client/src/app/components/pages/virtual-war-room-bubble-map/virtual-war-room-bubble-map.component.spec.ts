import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualWarRoomBubbleMapComponent } from './virtual-war-room-bubble-map.component';

describe('VirtualWarRoomBubbleMapComponent', () => {
  let component: VirtualWarRoomBubbleMapComponent;
  let fixture: ComponentFixture<VirtualWarRoomBubbleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualWarRoomBubbleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualWarRoomBubbleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
