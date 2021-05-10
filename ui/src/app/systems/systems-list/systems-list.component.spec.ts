import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsListComponent } from './systems-list.component';

describe('SystemsListComponent', () => {
  let component: SystemsListComponent;
  let fixture: ComponentFixture<SystemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
