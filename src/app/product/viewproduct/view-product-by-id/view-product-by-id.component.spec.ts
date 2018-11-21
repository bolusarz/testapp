import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductByIdComponent } from './view-product-by-id.component';

describe('ViewProductByIdComponent', () => {
  let component: ViewProductByIdComponent;
  let fixture: ComponentFixture<ViewProductByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
