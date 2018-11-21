import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesmeasureComponent } from './add-salesmeasure.component';

describe('AddSalesmeasureComponent', () => {
  let component: AddSalesmeasureComponent;
  let fixture: ComponentFixture<AddSalesmeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalesmeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesmeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
