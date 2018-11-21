import { Component, OnInit } from '@angular/core';
import {Product} from '../../../Models/product';
import {ProductService} from '../../../Services/product.service';
import {Category} from '../../../Models/category.model';

@Component({
  selector: 'app-view-product-by-category',
  templateUrl: './view-product-by-category.component.html',
  styleUrls: ['./view-product-by-category.component.css']
})
export class ViewProductByCategoryComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  public p = 1;
  public pc = 1;
  panelOpenState = false;

  constructor(private pservice: ProductService) { }

  ngOnInit() {
    this.pservice.getProducts().subscribe(data => {
      if (data) {
        this.products = data;
      }
    });
    this.pservice.getCategories().subscribe(data => {
        if (data) {
          this.categories = data;
        }
      });
  }

  getProducts(category: Category) {
    return this.products.filter(temp => temp.category === category.category_name);
  }

}
