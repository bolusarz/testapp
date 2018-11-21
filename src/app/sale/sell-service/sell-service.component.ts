import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../Models/service.model';
import {ProductService} from '../../Services/product.service';

@Component({
  selector: 'app-sell-service',
  templateUrl: './sell-service.component.html',
  styleUrls: ['./sell-service.component.css']
})
export class SellServiceComponent implements OnInit {
  service_saleform: FormGroup;
  services: Service[] = [];
  service = new Service();

  constructor(private fb: FormBuilder, private pservice: ProductService) {
    this.service_saleform = this.fb.group({
      'service_name': [null, Validators.required],
      'amount_paid': [null, Validators.required],
      'discount': [null],
      customer: this.fb.group({
        'name': [null],
        'email': [null],
        'phone_number': [null]
      })
    });
  }

  ngOnInit() {
    this.pservice.getServices().subscribe(data => {
      if (data) {
        this.services = data;
      }
    });
  }

  calculate() {
    this.service.total_price = 0;
    if (this.service_saleform.get('service_name').value) {
      for (let i = 0; i < this.service_saleform.get('service_name').value.length; i++) {
        this.service.total_price += +this.service_saleform.value.service_name[i].price;
      }
    }
    if (this.service_saleform.get('discount').value) {
      this.service.total_price = ((100 - this.service_saleform.get('discount').value) * this.service.total_price) / 100;
    }
    console.log(this.service_saleform.get('service_name').value);
    console.log(this.service_saleform.get('discount').value);
  }

  assign() {
  this.service_saleform.get('amount_paid').value ? this.service_saleform.get('amount_paid').setValue(null) :
    this.service_saleform.get('amount_paid').setValue(this.service.total_price);
  }

  save(form: any) {
    this.service.service_name = form.service_name;
    this.service.amount_paid = form.amount_paid;
    this.service.customer = form.customer;
    this.service.discount = form.discount;
    this.service.user = this.pservice.auth.getUser().email;
    console.log(this.service);
    this.pservice.sellServices(this.service).subscribe(data => {
      if (data) {
        this.pservice.service.success(data.message, 'Offer Services');
        this.service_saleform.reset();
      }
    });
  }

  cancel() {
    this.service_saleform.reset();
  }


}
