import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualWarRoomWellOperatingEnvelopeComponent } from './virtual-war-room-well-operating-envelope.component';

describe('VirtualWarRoomWellOperatingEnvelopeComponent', () => {
  let component: VirtualWarRoomWellOperatingEnvelopeComponent;
  let fixture: ComponentFixture<VirtualWarRoomWellOperatingEnvelopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualWarRoomWellOperatingEnvelopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualWarRoomWellOperatingEnvelopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
