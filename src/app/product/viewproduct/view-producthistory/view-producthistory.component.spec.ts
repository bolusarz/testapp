import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProducthistoryComponent } from './view-producthistory.component';

describe('ViewProducthistoryComponent', () => {
  let component: ViewProducthistoryComponent;
  let fixture: ComponentFixture<ViewProducthistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProducthistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProducthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
