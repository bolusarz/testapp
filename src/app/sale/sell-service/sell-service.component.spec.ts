import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellServiceComponent } from './sell-service.component';

describe('SellServiceComponent', () => {
  let component: SellServiceComponent;
  let fixture: ComponentFixture<SellServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
