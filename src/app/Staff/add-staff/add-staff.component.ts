import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';
import {Admin} from '../../Models/admin';
import {MessageService} from '../../Services/message.service';
import {StaffService} from '../../Services/staff.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {

  constructor(private fb: FormBuilder, private authstaff: StaffService,
              private router: Router, private service: MessageService,
              private auth: AuthService, private spinner: NgxSpinnerService) {
    this.regForm = this.fb.group({

      'fname': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'sname': [null, Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])],

      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],

      'number': [null, Validators.required],

      'pwd': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])],

      'cpwd': [null, Validators.required]
    }, {validator: this.checkIfMatchingPasswords('pwd', 'cpwd')});
  }

  user: Admin;
  regForm: FormGroup;

  valid_msg = {
    'fname': [
      { type: 'required', message: 'Firstname is required' },
      { type: 'minlength', message: 'Firstname must be at least 5 characters long' },
    ],
    'sname': [
      { type: 'required', message: 'Surname is required' },
      { type: 'minlength', message: 'Surname must be at least 5 characters long' },
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'number': [
      { type: 'required', message: 'Phone number is required' }
    ],
    'cpwd': [
      { type: 'required', message: 'Re-enter your password' },
      { type: 'validateEqual', message: 'Passwords do not match' }
    ],
    'pwd': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]
  };


  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  ngOnInit() {

  }


  onSubmit(form: any) {
    if (form) {
      this.spinner.show();
      this.user = new Admin();
      this.user.firstname = form.fname;
      this.user.lastname = form.sname;
      this.user.email = form.email;
      this.user.business_name = this.auth.getUser().bizname;
      this.user.phoneNumber = form.number;
      this.user.password = form.pwd;
      this.authstaff.registerStaff(this.user).subscribe(
        res => {
          if (res) {
            if (res.status) {
              console.log('Operation Successful');
              this.spinner.hide();
              this.service.success(res.message, 'Success');
              this.router.navigate([`${this.auth.getUser().bizname}/dashboard`]);
              this.regForm.reset();
            } else {
              console.log('Operation unsuccessful');
              this.spinner.hide();
              this.service.error(res.message, 'error');
            }
          } else {
            this.spinner.hide();
            console.log(`Couldn't connect to the database`);
          }

        }
      );
    }

  }


}
