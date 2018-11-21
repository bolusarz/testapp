import { Component, OnInit } from '@angular/core';
import {Product} from '../../../Models/product';
import {Brand} from '../../../Models/brand.model';
import {ProductService} from '../../../Services/product.service';

@Component({
  selector: 'app-view-product-by-brand',
  templateUrl: './view-product-by-brand.component.html',
  styleUrls: ['./view-product-by-brand.component.css']
})
export class ViewProductByBrandComponent implements OnInit {
  products: Product[] = [];
  brands: Brand[] = [];
  panelOpenState = false;
  p = 1;
  pc = 1;

  constructor(private pservice: ProductService) {
  }

  ngOnInit() {
    this.pservice.getProducts().subscribe(data => {
      if (data) {
        this.products = data;
      }
    });
    this.pservice.getBrand().subscribe(data => {
      if (data) {
        this.brands = data;
      }
    });
  }

  getProducts(brand: Brand) {
    return this.products.filter(temp => temp.brand === brand.brand_name);
  }
}

