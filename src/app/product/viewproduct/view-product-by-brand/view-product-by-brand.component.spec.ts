import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductByBrandComponent } from './view-product-by-brand.component';

describe('ViewProductByBrandComponent', () => {
  let component: ViewProductByBrandComponent;
  let fixture: ComponentFixture<ViewProductByBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductByBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductByBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
