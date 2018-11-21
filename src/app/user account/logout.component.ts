import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ``,
})
export class LogoutComponent implements OnInit {

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    this._auth.logout(this._auth.getUser()).subscribe(
      data => {
        if (data.status) {
          this.router.navigateByUrl('login');
        }
      }
    );
  }

}
