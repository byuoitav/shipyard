import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsViewComponent } from './rooms-view.component';

describe('RoomsViewComponent', () => {
  let component: RoomsViewComponent;
  let fixture: ComponentFixture<RoomsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
