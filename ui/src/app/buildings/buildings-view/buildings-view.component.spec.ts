import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingsViewComponent } from './buildings-view.component';

describe('BuildingsViewComponent', () => {
  let component: BuildingsViewComponent;
  let fixture: ComponentFixture<BuildingsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
