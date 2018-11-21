import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {Product} from '../../Models/product';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ViewProductByIdComponent} from './view-product-by-id/view-product-by-id.component';
import { _ } from 'underscore';
import { SnotifyService } from 'ng-snotify';
import {EditProductComponent} from '../addproduct/edit-product/edit-product.component';
import {Admin} from '../../Models/admin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  products: Product[] = [];
  p = 1;
  constructor(private pservice: ProductService, private dialog: MatDialog,
              private service: SnotifyService, private router: Router) { }

  ngOnInit() {
    this.pservice.getProducts().subscribe(data => this.products = data);
  }

  update_product(product: Product) {
    this.check_product(product.productkey) ?
      this.products[this.products.indexOf(this.check_product(product.productkey))] = product : this.products.push(product);
  }

  check_product(key: string) {
    return this.products.find(temp => temp.productkey === key);
  }

  viewSingleProduct(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = product;
    this.dialog.open(ViewProductByIdComponent, dialogConfig);
  }

  edit(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = product;
    this.dialog.open(EditProductComponent, dialogConfig).afterClosed().subscribe(
      data => {
        if (data) {
            const newproduct = new Product(data);
            if (!newproduct.picture) {
              newproduct.picture = null;
            }
            newproduct.productkey = product.productkey;
            newproduct.user = new Admin();
            newproduct.user.email = this.pservice.auth.getUser().email;
            newproduct.user.business_name = this.pservice.auth.getUser().bizname;
            console.log(product, newproduct);
            this.pservice.updateProducts(newproduct).subscribe(
              res => {
                if (res) {
                  if (res.status) {
                    this.pservice.service.success('Product Updated Successfully', 'Update Product');
                    this.update_product(newproduct);
                    this.router.routeReuseStrategy.shouldReuseRoute = function () {
                      return false;
                    };
                  } else {
                    this.pservice.service.error('Product couldn\'t be updated at this time, Try Again Later. If' +
                      ' the problem persists contact our help desk or report the problem', 'Update Product');
                  }
                } else {
                  this.pservice.service.error('Product couldn\'t be updated at this time, Try Again Later. If' +
                    ' the problem persists contact our help desk or report the problem', 'Update Product');
                }
              });
        }
      });
  }

  view_history(productkey: string) {
    this.router.navigate([`${this.pservice.auth.getUser().bizname}/view-product-history`, productkey]);
  }

  view_sale(productkey: string) {
    this.router.navigate([`${this.pservice.auth.getUser().bizname}/view-sales`, productkey]);
  }

  delete(product: Product) {
    this.service.confirm(`Are you sure you want to delete ${product.product_name}`, 'Delete', {
      timeout: 15000,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      position: 'centerCenter',
      buttons: [
        {text: 'Yes please!', action: (toast) => {
          this.service.remove(toast.id);
          this.pservice.deleteProduct(product).subscribe(
            data => {
              if (data.status) {
                this.pservice.service.success(data.message);
                this.products = _.reject(this.products, function(temp) {return temp.productkey === product.productkey; });
              }
            }
          ); }},
        {text: 'No, Made a mistake', action: (toast) => this.service.remove(toast.id)}
      ]
    });
  }

}
