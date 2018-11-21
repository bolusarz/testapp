import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Admin} from '../Models/admin';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient, private service: MessageService) { }

  private apiUrl = 'http://DESKTOP-74LNCC1:80/TheAutom/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      this.service.error(`${error.message}`, `${operation} failed `);
      return of(result as T);
    };
  }

  registerStaff(user: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl + 'register/staffregister.php', user, this.httpOptions).pipe(
      tap(res => console.log(res.message)),
      catchError(this.handleError<Admin>('register'))
    );
  }
}
