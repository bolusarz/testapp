import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from '../../Services/message.service';
import { AuthService } from '../../Services/auth.service';
import { Admin } from '../../Models/admin';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService,
              private router: Router, private service: MessageService) {
    this.regForm = this.fb.group({

      'fname': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],

      'sname': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],

      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],

      'bizname': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],

      'number': [null, Validators.required],

        'pwd': [null, Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ])],

        'cpwd': [null, Validators.required],

      'terms': [false, Validators.pattern('true')]
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
    'bizname': [
      { type: 'required', message: 'Business product_name is required' },
      { type: 'minlength', message: 'Business product_name must be at least 6 characters long' },
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
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
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
      this.user = new Admin();
      this.user.firstname = form.fname;
      this.user.lastname = form.sname;
      this.user.email = form.email;
      this.user.business_name = form.bizname;
      this.user.phoneNumber = form.number;
      this.user.password = form.pwd;
      this.auth.register(this.user).subscribe(
        res => {
          if (res) {
            if (res.status) {
              this.service.success(res.message, 'Registration Successfully');
              this.router.navigate(['login']);
              this.regForm.reset();
            } else {
              console.log('Registration unsuccessful at this time, Try Again Later');
              this.service.error(res.message, 'Error');
            }
          } else {
            console.log(`Couldn't connect to the database`);
          }

        }
      );
    }

  }

}
