import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../Services/auth.service';
import {MessageService} from '../../Services/message.service';
import {ProductService} from '../../Services/product.service';
import {Service} from '../../Models/service.model';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  serviceform: FormGroup;
  private service: Service;

  constructor(private fb: FormBuilder, private router: Router,
              private http: HttpClient, private auth: AuthService,
              private msg: MessageService, private pservice: ProductService) {
    this.serviceform = fb.group({
      'service_name': [null, Validators.required],
      'price': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  save(form: any) {
    form.user = {email: this.auth.getUser().email, business_name: this.auth.getUser().bizname};
    console.log(form);
    this.service = new Service(form);
    this.pservice.addServices(this.service).subscribe(
      data => {
        if (data.status) {
          this.msg.success(data.message, 'Success');
          this.serviceform.reset();
          this.pservice.redirect('product');
        } else {
          this.msg.error(data.message, 'Error');
        }
      }
    );
  }

  save_and_addanother(form: any) {
    form.user = {email: this.auth.getUser().email, business_name: this.auth.getUser().bizname};
    this.service = new Service(form);
    console.log(this.service);
    this.pservice.addServices(this.service).subscribe(
      data => {
        if (data.status) {
          this.msg.success(data.message, 'Success');
          this.serviceform.reset();
          this.pservice.redirect('product/add-service');
        } else {
          this.msg.error(data.message, 'Error');
        }
      }
    );
  }

  cancel() {
    this.serviceform.reset();
  }

}
