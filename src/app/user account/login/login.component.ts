import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';

import { MessageService } from '../../Services/message.service';
import {AuthService} from '../../Services/auth.service';
import {Admin} from '../../Models/admin';
import {ForgotPasswordComponent} from '../forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide = true;
  private user: Admin =  new Admin();
  authForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,
              private router: Router, private msgService: MessageService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
  });
  }
  logIn() {
    this.auth.login(this.user).subscribe(
      data => { if (data.status) {
        if (data.position === 'Owner') {
          this.router.navigate([`${data.business_name}/dashboard`]);
        } else {
          this.router.navigate([`${data.business_name}/product`]);
        }
        this.msgService.success(data.message, 'Success');
        this.authForm.reset();
      } else {
        this.msgService.error(data.message);
      }
      }
    );
  }


  onSubmit(form: any): void {
    this.user.email = form.email;
    this.user.password = form.password;
    console.log(this.user);
    this.logIn();
  }

  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(ForgotPasswordComponent, dialogConfig).afterClosed().subscribe(res => {
      if (res) {
          this.auth.forgot_password(res).subscribe(data => {
            if (data && data.status) {
              this.msgService.success(data.message);
            } else {
              this.msgService.error(data.message);
            }
          });
      }
    });
  }

}
