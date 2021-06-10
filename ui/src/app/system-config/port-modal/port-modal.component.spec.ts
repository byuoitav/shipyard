import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortModalComponent } from './port-modal.component';

describe('PortModalComponent', () => {
  let component: PortModalComponent;
  let fixture: ComponentFixture<PortModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
