import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../../Services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../Models/product';
import { _ } from 'underscore';

@Component({
  selector: 'app-view-producthistory',
  templateUrl: './view-producthistory.component.html',
  styleUrls: ['./view-producthistory.component.css']
})
export class ViewProducthistoryComponent implements OnInit {
  products: Product[] = [];
  dates: any = [];
  productKey = '';
  p = 1;
  constructor(private pservice: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
   this.route.params.subscribe(params => {
     this.productKey = params['productkey'];
   });
    console.log(this.productKey);
    this.pservice.getProductHistory(this.productKey).subscribe(data => {
      if (data) {
        this.products = data;
        this.unique();
      }
    });
  }

  unique() {
    for (let i = 0; i < this.products.length; i++) {
      if (!this.dates.includes(this.products[i].date_added)) {
        this.dates.push(this.products[i].date_added);
      }
    }
  }

  getProducts(date) {
    return this.products.filter(temp => temp.date_added === date);
  }

}
