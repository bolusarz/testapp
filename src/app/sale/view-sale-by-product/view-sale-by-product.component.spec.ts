import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSaleByProductComponent } from './view-sale-by-product.component';

describe('ViewSaleByProductComponent', () => {
  let component: ViewSaleByProductComponent;
  let fixture: ComponentFixture<ViewSaleByProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSaleByProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSaleByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
