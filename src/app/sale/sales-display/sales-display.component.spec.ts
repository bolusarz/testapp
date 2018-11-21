import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDisplayComponent } from './sales-display.component';

describe('SalesDisplayComponent', () => {
  let component: SalesDisplayComponent;
  let fixture: ComponentFixture<SalesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
