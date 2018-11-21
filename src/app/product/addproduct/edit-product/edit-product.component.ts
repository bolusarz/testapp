import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {Product} from '../../../Models/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { isEqual } from 'underscore';
import {ProductService} from '../../../Services/product.service';
import {Brand} from '../../../Models/brand.model';
import {Category} from '../../../Models/category.model';
import {Observable} from 'rxjs';

export interface Test {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editproductform: FormGroup;
  measure: Test[] = [
    {value: 'Pieces', viewValue: 'In pieces'},
    {value: 'bag', viewValue: 'BAG'},
    {value: 'pack', viewValue: 'PACK'},
    {value: 'carton', viewValue: 'CARTON'},
  ];
  public url = this.product.picture;
  public brands: Observable<Brand[]>;
  public categories: Observable<Category[]>;
  constructor(private dialogRef: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product, private fb: FormBuilder,
              private pservice: ProductService) {
    this.editproductform = this.fb.group({
      'product_name': [this.product.product_name, Validators.required],
      'category': [this.product.category, Validators.required],
      'price': [this.product.price, Validators.required],
      'quantity': [this.product.quantity, Validators.compose([
          Validators.min(this.product.quantity), Validators.required
        ]
      )],
      'picture': null,
      'quantity_pieces': [this.product.quantity_pieces],
      'brand': [this.product.brand],
      'product_measure': [null, Validators.required],
      'selling_price': [this.product.selling_price, Validators.required],
    });
    this.brands = this.pservice.getBrand();
    this.categories = this.pservice.getCategories();
  }

  ngOnInit() {
  }

  save(form) {
    this.dialogRef.close(form);
  }

  cancel() {
    this.dialogRef.close();
  }

  upload(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.editproductform.get('picture').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
        this.url = _event.target.result;
      };
    }
  }

}
