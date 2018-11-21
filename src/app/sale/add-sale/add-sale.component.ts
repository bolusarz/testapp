import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../Services/product.service';
import { _ } from 'underscore';

import {Product} from '../../Models/product';
import {AuthService} from '../../Services/auth.service';
import {Sales} from '../../Models/sales.model';
import {SalesMeasure} from '../../Models/sales_measure.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddSalesmeasureComponent} from '../add-salesmeasure/add-salesmeasure.component';
import {MessageService} from '../../Services/message.service';
import {ExtraInfoComponent} from '../extra-info/extra-info.component';
import {SalesInfo} from '../../Models/extra_sales_info.model';
import {Admin} from '../../Models/admin';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  constructor(private fb: FormBuilder, private pservice: ProductService,
              private auth: AuthService, private dialog: MatDialog,
              private msgservice: MessageService) {
    this.salesform = fb.group({
      'product': [null, Validators.required],
      'quantity': [null, Validators.compose([Validators.required, Validators.min(1)])],
      'sales_measure': [null, Validators.required],
      'amount_paid': [null],
      'customer': [null],
      'remark': [null]
    });
    this.searchform = fb.group({
      'search': [null, Validators.required]
    });
  }
  salesform: FormGroup;
  searchform: FormGroup;
  display = false;
  public products: Product[] = [];
  public discount = 0;
  public sales: Sales[] = [];
  public salesmeasure: SalesMeasure[] = [];
  public total = 0;
  private extra_info: SalesInfo;

  static check_sale_measure(price: number, sale) {
    return sale.sales_measure.price === price;
  }


  ngOnInit() {
    this.pservice.getProducts().subscribe(
      data => this.products = data
    );
  }

  _discount() {
    if (this.discount !== 0) {
      this.total = ((100 - this.discount) * this.total) / 100;
    }
  }

  add_salesmeasure(item: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    this.dialog.open(AddSalesmeasureComponent, dialogConfig).afterClosed().subscribe(
      data => {
        if (data) {
          const measure = new SalesMeasure(data);
          this.pservice.addSalesMeasure(measure, item).subscribe(
            res => {
              if (res.status) {
                console.log(res);
                this.salesmeasure.push(measure);
              }
              },
            err => console.log(err)
          );
        }
      }
    );
  }

  add_extra_info() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = this.calculate();
    this.dialog.open(ExtraInfoComponent, dialogConfig).afterClosed().subscribe(
      data => {
        if (data) {
          this.extra_info = new SalesInfo(data);
        }
      }
    );
  }

  add(form) {
    const product = this.check_product(form.search);
    this.searchform.reset();
    if (product) {
      this.salesmeasure = product.sales_measure;
      this.salesform.patchValue({
        'product': product.product_name,
        'quantity': [1]
      });
      this.display = true;
    }
  }

  edit(item: any) {
    if (item.operation === 'edit') {
      this.display = true;
      const product = this.check_product(item.sale.product);
      const sale = this.check_sale(item.sale.product);
      console.log(sale, product);
      this.salesmeasure = product.sales_measure;
      this.salesform.get('product').setValue(item.sale.product);
      this.salesform.get('quantity').setValue(item.sale.quantity);
    } else {
      this.sales = _.reject(this.sales, function(temp) {return temp.product === item.sale.product; });
      this.products[this.products.indexOf(this.check_product(item.sale.product))].total_pieces += item.sale.quantity;
      this.products[this.products.indexOf(this.check_product(item.sale.product))].quantity = (
        this.products[this.products.indexOf(this.check_product(item.sale.product))].total_pieces *
        this.products[this.products.indexOf(this.check_product(item.sale.product))].quantity_pieces
      );
      console.log(this.sales);
      console.log(this.products);
      this.calculate();
    }
  }

  update_product(product: Product) {
    this.check_product(product.product_name) ?
      this.products[this.products.indexOf(this.check_product(product.product_name))] = product : this.products.push(product);
  }


  check_product(product: string) {
    return this.products.find(temp => temp.product_name === product);
  }

  check_sale(sale: string) {
    return this.sales.find(temp => temp.product === sale);
  }

  check_measure(price: number, product) {
   return product.sales_measure.find(temp => temp.price === price);
  }

  save_add(form: any) {
    this.display = false;
   const product = this.check_product(form.product);
   const measure = this.check_measure(form.sales_measure, product);
   if (product.quantity * product.quantity_pieces < form.quantity * measure.quantity) {
     this.msgservice.error('Quantity available is not enough');
   } else {
     this.salesform.reset();
     const temp_sale = new Sales(form);
     temp_sale.price = form.quantity * form.sales_measure;
     if (product.total_pieces) {
       product.total_pieces -= measure.quantity * form.quantity;
       product.quantity = product.total_pieces / product.quantity_pieces;
     } else {
       product.quantity -= measure.quantity * form.quantity;
     }
     this.update_product(product);
     temp_sale.sales_measure = measure;
     temp_sale.user = new Admin();
     temp_sale.user.business_name = this.auth.getUser().bizname;
     temp_sale.user.email = this.auth.getUser().email;
     this.check_sale(form.product) && AddSaleComponent.check_sale_measure(form.sales_measure, this.check_sale(form.product)) ?
       this.sales[this.sales.indexOf(this.check_sale(form.product))] = temp_sale : this.sales.push(temp_sale);
     this.salesform.reset();
     console.log(this.products);
     console.log(this.sales);
     console.log(this.extra_info);
     console.log(this.calculate(), this.total);
     console.log({extra_info: this.extra_info, sales: this.sales});
   }
  }

  calculate() {
    let total = 0;
    for (let i = 0; i < this.sales.length; i++) {
      total += this.sales[i].price;
    }
    if (this.discount !== 0) {
      total = ((100 - this.discount) * total) / 100;
    }
    return total;
  }

  removeArr() {
    this.sales.forEach(val => {
      if (typeof(val.quantity) === 'object' ) {
          val.quantity = val.quantity[0];
      }
    });
  }

  save() {
    if (this.extra_info) {
      this.extra_info.total = this.calculate();
      this.extra_info.discount = this.discount;
      this.removeArr();
      this.pservice.addSales({extra_info: this.extra_info, sales: this.sales}).subscribe(
        data => {
          if (data) {
            this.msgservice.success(data.message);
            this.sales = [];
            this.total = 0;
            this.discount = 0;
          }
        }
      );
    } else {
      this.pservice.service.error('Please fill in the sales details');
    }
  }

  cancel() {
    this.display = false;
  }

}
