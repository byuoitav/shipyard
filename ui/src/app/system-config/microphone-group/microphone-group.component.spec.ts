import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrophoneGroupComponent } from './microphone-group.component';

describe('MicrophoneGroupComponent', () => {
  let component: MicrophoneGroupComponent;
  let fixture: ComponentFixture<MicrophoneGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrophoneGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrophoneGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
