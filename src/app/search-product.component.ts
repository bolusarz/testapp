import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Product} from './Models/product';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ProductService} from './Services/product.service';

@Component({
  selector: 'app-search-product',
  template: `
    <div class="container-fluid" [formGroup]="searchForm">
      <mat-form-field class="mr-3">
        <mat-label> Search Products.... </mat-label>
        <input type="text" matInput title="product" [formControl]="searchForm.controls['product']">
        <mat-icon matSuffix> search </mat-icon>
      </mat-form-field>
      <button mat-raised-button class="btn-primary" (click)="search(searchForm.value)">Add</button>
    </div>
    `
})
export class SearchProductComponent implements OnInit {
  @Output() result: EventEmitter<Product> = new EventEmitter<Product>();
  searchForm: FormGroup;
  constructor(private fb: FormBuilder, private pservice: ProductService) {
    this.searchForm = fb.group({
      'product' : null
    });
  }

  ngOnInit() {
  }

  search(form) {
    this.pservice.searchProducts(form).subscribe(
      data => {this.result.emit(data); this.searchForm.reset(); },
      err => console.log(err)
    );
  }

}
