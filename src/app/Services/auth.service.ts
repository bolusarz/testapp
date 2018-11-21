import { Injectable } from '@angular/core';
import { Admin } from '../Models/admin';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router } from '@angular/router';
import {MessageService} from './message.service';
import {CookieService} from 'angular2-cookie/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Admin = new Admin();

  constructor(private http: HttpClient, private service: MessageService,
              private router: Router, private cookie: CookieService) {
  }

  private apiUrl = 'http://DESKTOP-74LNCC1:80/TheAutom/' || environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  deleteUser(user: Admin): Observable<Admin> {
    const params = new HttpParams().set('businessname', this.getUser().bizname);
    const options = {header: this.httpOptions.headers, params: params};
    return this.http.post<Admin>(this.apiUrl + 'staff/deletestaff', user, options).pipe(
      tap(res => {this.service.notLoading(); console.log(res); }),
      catchError(this.handleError<Admin>('Delete Admin'))
    );
  }

  isloggedin(): boolean {
    return this.getUser() !== null;
  }

  getStaff(): Observable<Admin[]> {
    this.service.Loading();
    const params = new HttpParams().set('businessname', this.getUser().bizname);
    const options = {header: this.httpOptions.headers, params: params};
    return this.http.get<Admin[]>(this.apiUrl + 'staff/getstaff', options).pipe(
      tap(res => {console.log(res); this.service.notLoading(); }),
      catchError(this.handleError<Admin[]>('Get Staff'))
    );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      this.service.error(`${error.message}`, `${operation} failed `);
      this.service.notLoading();
      return of(result as T);
    };
  }

  register(user: Admin): Observable<Admin> {
    this.service.Loading();
    return this.http.post<Admin>(this.apiUrl + 'register/register', user, this.httpOptions).pipe(
      tap(res => {console.log(res.message); this.service.notLoading(); }),
      catchError(this.handleError<Admin>('register'))
    );
  }

  login(user: Admin): Observable<Admin> {
    this.service.Loading();
    return this.http.post<Admin>(this.apiUrl + 'auth/login', user, this.httpOptions).pipe(
      tap(res => {
        if (res.status) {
          sessionStorage.setItem('user', JSON.stringify({name: res.firstname, email: res.email,
            bizname: res.business_name, position: res.position}));
          this.user.email = res.email;
          this.user.firstname = res.firstname;
          this.service.notLoading();
        } else {
          this.service.notLoading();
        }

      }),
      catchError(this.handleError<Admin>('Login'))
    );
  }

  logout(user: Admin): Observable<Admin> {
    this.service.Loading();
    return this.http.post<Admin>(this.apiUrl + 'auth/logout', user, this.httpOptions).pipe(
      tap(() => {
        sessionStorage.removeItem('user');
        this.cookie.remove('user');
        this.service.notLoading();
      }),
      catchError(this.handleError<Admin>('Logout'))
    );
  }

  confirm_business(param: string) {
    if (param !== this.getUser().bizname) {
      this.router.navigate(['login']);
    }
  }

  forgot_password(email: string): Observable<any> {
    this.service.Loading();
    return this.http.post<any>(this.apiUrl + 'functions/forgotpassword', email).pipe(
      tap(() => this.service.notLoading())
    );
}
}
