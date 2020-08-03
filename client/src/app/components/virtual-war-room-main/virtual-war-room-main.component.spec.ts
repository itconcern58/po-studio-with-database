import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualWarRoomMainComponent } from './virtual-war-room-main.component';

describe('VirtualWarRoomMainComponent', () => {
  let component: VirtualWarRoomMainComponent;
  let fixture: ComponentFixture<VirtualWarRoomMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualWarRoomMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualWarRoomMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
