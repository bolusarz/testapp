import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../Services/auth.service';
import {MessageService} from '../Services/message.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessGuard implements CanActivate {
  param: string;
  constructor(private service: MessageService, private router: Router, private auth: AuthService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.auth.getUser().position === 'Staff') {
      this.router.navigate([`${this.auth.getUser().bizname}/product`]);
    } else {
      return true;
    }
  }
}
