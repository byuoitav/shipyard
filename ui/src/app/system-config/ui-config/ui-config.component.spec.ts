import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiConfigComponent } from './ui-config.component';

describe('UiConfigComponent', () => {
  let component: UiConfigComponent;
  let fixture: ComponentFixture<UiConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
