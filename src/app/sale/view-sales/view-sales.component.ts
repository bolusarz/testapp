import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {ViewSale} from '../../Models/view-sale';

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.css']
})
export class ViewSalesComponent implements OnInit {
  p = 1;
  pc = 1;
  public sales: ViewSale;
  public options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  date = new Date();
  constructor(private pservice: ProductService) { }

  ngOnInit() {
    this.pservice.getSales(this.date.toLocaleDateString('en-GB', this.options)).subscribe(data => {
      if (data) {
        this.sales = data;
      }
    });
  }

  getParticularSale() {
    this.pservice.getSales(this.date.toLocaleDateString('en-GB', this.options)).subscribe(data => this.sales = data);
  }

}
