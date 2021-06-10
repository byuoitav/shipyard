import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortConfigComponent } from './port-config.component';

describe('PortConfigComponent', () => {
  let component: PortConfigComponent;
  let fixture: ComponentFixture<PortConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
