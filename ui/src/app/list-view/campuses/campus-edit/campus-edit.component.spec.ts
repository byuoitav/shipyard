import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusEditComponent } from './campus-edit.component';

describe('CampusEditComponent', () => {
  let component: CampusEditComponent;
  let fixture: ComponentFixture<CampusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
