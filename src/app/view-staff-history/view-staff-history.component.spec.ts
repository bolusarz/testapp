import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaffHistoryComponent } from './view-staff-history.component';

describe('ViewStaffHistoryComponent', () => {
  let component: ViewStaffHistoryComponent;
  let fixture: ComponentFixture<ViewStaffHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStaffHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaffHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
