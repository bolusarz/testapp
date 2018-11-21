import { Component, OnInit } from '@angular/core';
import {Properties} from '../Models/properties.model';
import {ProductService} from '../Services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public prop: Properties = new Properties();
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.getBusinessProperties().subscribe(
      data => {
        this.prop = new Properties(data);
      }
    );
  }

}
