import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../Services/product.service';

@Component({
  selector: 'app-view-sale-by-product',
  templateUrl: './view-sale-by-product.component.html',
  styleUrls: ['./view-sale-by-product.component.css']
})
export class ViewSaleByProductComponent implements OnInit {
  public sales: any;
  public sale: any;
  public p = 1;
  options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  date = new Date();
  private query: number;
  constructor(private route: ActivatedRoute, private pservice: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.query = params['productkey']);
    this.pservice.getProductSales(this.query, this.date.toLocaleDateString('en-GB', this.options)).subscribe(data => this.sales = data
    );
  }

  getParticularSale() {
    this.pservice.getProductSales(this.query, this.date.toLocaleDateString('en-GB', this.options)).subscribe(data => this.sales = data);
  }
}
