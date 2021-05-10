import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsViewComponent } from './systems-view.component';

describe('SystemsViewComponent', () => {
  let component: SystemsViewComponent;
  let fixture: ComponentFixture<SystemsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
