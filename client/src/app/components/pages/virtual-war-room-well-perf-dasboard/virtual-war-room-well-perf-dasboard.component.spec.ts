import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualWarRoomWellPerfDasboardComponent } from './virtual-war-room-well-perf-dasboard.component';

describe('VirtualWarRoomWellPerfDasboardComponent', () => {
  let component: VirtualWarRoomWellPerfDasboardComponent;
  let fixture: ComponentFixture<VirtualWarRoomWellPerfDasboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualWarRoomWellPerfDasboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualWarRoomWellPerfDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
