import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../directives/error';
import {MessageService} from '../../Services/message.service';
import {Product} from '../../Models/product';
import {Admin} from '../../Models/admin';
import {Category} from '../../Models/category.model';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import {ProductService} from '../../Services/product.service';
import {Brand} from '../../Models/brand.model';
import {Observable} from 'rxjs';

export interface Test {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  productform: FormGroup;
  matcher = new MyErrorStateMatcher();
  product: Product;
  categories: Observable<Category[]>;
  url = '';
  measure: Test[] = [
    {value: 'Pieces', viewValue: 'In pieces'},
    {value: 'bag', viewValue: 'BAG'},
    {value: 'pack', viewValue: 'PACK'},
    {value: 'carton', viewValue: 'CARTON'},
  ];
  user: Admin;
  brands: Observable<Brand[]>;
  constructor(private fb: FormBuilder, private msgService: MessageService,
              private router: Router, private auth: AuthService, private service: ProductService) {
    this.productform = this.fb.group({
      'product_name': [null, Validators.required],
      'price': [null, Validators.required],
      'quantity': [null, Validators.required],
      'category': [null, Validators.required],
      'picture': null,
      'brand': [null],
      'product_measure': [null, Validators.required],
      'quantity_pieces': [null],
      'selling_price': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.categories = this.service.getCategories();
    this.brands = this.service.getBrand();
  }

  save(form: any) {
    if (form) {
      console.log(form);
      form.user = {email: this.auth.getUser().email, business_name: this.auth.getUser().bizname};
      this.product = new Product(form);
      console.log(this.product);
      this.service.addProducts(this.product).subscribe(data => {
          if (data.status) {
            this.msgService.success(data.message, 'Success');
            this.productform.reset();
            this.service.redirect('product');
          } else {
            this.msgService.error(data.message, 'Error');
          }
      });
    }
  }

  save_and_addanother(form: any) {
    if (form) {
      console.log(form);
      form.user = {email: this.auth.getUser().email, business_name: this.auth.getUser().bizname};
      this.product = new Product(form);
      console.log(this.product);
      this.service.addProducts(this.product).subscribe(data => {
        if (data.status) {
          this.msgService.success(data.message, 'Success');
          this.productform.reset();
        }
      });
    }
  }

  cancel() {
    this.productform.reset();
    this.productform.markAsUntouched();
  }

  upload(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.productform.get('picture').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
        this.url = _event.target.result;
      };
    }
  }

}
