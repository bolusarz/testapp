import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceHistoryComponent } from './view-service-history.component';

describe('ViewServiceHistoryComponent', () => {
  let component: ViewServiceHistoryComponent;
  let fixture: ComponentFixture<ViewServiceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewServiceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
