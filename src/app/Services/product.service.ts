import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Category} from '../Models/category.model';
import {catchError, tap} from 'rxjs/operators';
import {Product} from '../Models/product';
import {AuthService} from './auth.service';
import {MessageService} from './message.service';
import {Brand} from '../Models/brand.model';
import {Service} from '../Models/service.model';
import {Router} from '@angular/router';
import {Properties} from '../Models/properties.model';
import {SalesMeasure} from '../Models/sales_measure.model';
import {HttpParamsOptions} from '@angular/common/http/src/params';
import {Debtor} from '../Models/debtor.model';
import {ViewSale} from '../Models/view-sale';
import {environment} from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://DESKTOP-74LNCC1:80/TheAutom/' || environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams().set('businessname', this.auth.getUser().bizname)
  };

  constructor(private http: HttpClient, public auth: AuthService, public service: MessageService, private router: Router) {}


  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      this.service.error(`${error.message}`, `${operation} failed `);
      this.service.notLoading();
      return of(result as T);
    };
  }

  getCategories(): Observable<Category[]> {
    this.service.Loading();
    return this.http.get<Category[]>(this.apiUrl + 'product/category', this.httpOptions).pipe(
      tap(() => { this.service.notLoading(); }),
      catchError(this.handleError<Category[]>('register category'))
    );
  }

  getBrand(): Observable<Brand[]> {
    this.service.Loading();
    return this.http.get<Brand[]>(this.apiUrl + 'product/brand', this.httpOptions).pipe(
      tap(() => { this.service.notLoading(); }),
      catchError(this.handleError<Brand[]>('register brand'))
    );
  }

  getProducts(): Observable<Product[]> {
    this.service.Loading();
    return this.http.get<Product[]>(this.apiUrl + 'product/form', this.httpOptions ).pipe(
      tap(() => { this.service.notLoading(); }),
      catchError(this.handleError<Product[]>('Get Products'))
    );
  }

  getProductHistory(product: string): Observable<Product[]> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = {fromObject: {businessname: this.auth.getUser().bizname, productkey: product}} as
      HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.get<Product[]>(this.apiUrl + 'product/actions', options).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<Product[]>('Get Product History'))
    );
  }

  getServiceHistory(id: string): Observable<Service[]> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = {fromObject: {businessname: this.auth.getUser().bizname, servicekey: id}} as
      HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.get<Service[]>(this.apiUrl + 'service/actions', options).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<Service[]>('Get Service History'))
    );
  }

  getSales(date?: any): Observable<ViewSale> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = {fromObject: {businessname: this.auth.getUser().bizname, date: date  || null}} as
      HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.get<ViewSale>(this.apiUrl + 'sales/getsales', options).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<ViewSale>('Get particular Sales'))
    );
  }

  getProductSales(productkey: any, date?: any): Observable<any> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = {fromObject: {businessname: this.auth.getUser().bizname, productkey: productkey,
        date: date || null}} as HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.get<any>(this.apiUrl + 'sales/getproductsales', options).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<any>('Get particular Sales'))
    );
  }

  getBusinessProperties(): Observable<Properties> {
    return this.http.get<Properties>(this.apiUrl + 'utility.php', this.httpOptions).pipe(
      catchError(this.handleError<Properties>('Business properties'))
    );
  }

  getServices(): Observable<Service[]> {
    this.service.Loading();
    return this.http.get<Service[]>(this.apiUrl + 'service/form.php', this.httpOptions).pipe(
      tap(() => { this.service.notLoading(); }),
      catchError(this.handleError<Service[]>('Get Services'))
    );
  }

  addSalesMeasure(measure: SalesMeasure, product: string): Observable<SalesMeasure> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = {fromObject: {businessname: this.auth.getUser().bizname, product: product}} as HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.post<SalesMeasure>(this.apiUrl + 'sales/salesmeasure.php', measure, options).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<SalesMeasure>('Add SalesMeasure'))
    );
  }

  addProducts(product: Product): Observable<Product> {
    this.service.Loading();
    return this.http.post<Product>(this.apiUrl + 'product/form', product, this.httpOptions).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<Product>('Add product'))
    );
  }

  addSales(sales: {}, date?: any): Observable<any> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = {fromObject: {businessname: this.auth.getUser().bizname, date: date  || null}} as
      HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.post<any>(this.apiUrl + 'sales/sales', sales, options).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<any>('Add sales'))
    );
  }

  addServices(service: Service): Observable<Service> {
    this.service.Loading();
    return this.http.post<Service>(this.apiUrl + 'service/form', service, this.httpOptions).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<Service>('Add service'))
    );
  }

  sellServices(service: Service): Observable<Service> {
    this.service.Loading();
    return this.http.post<Service>(this.apiUrl + 'sales/servicesales', service, this.httpOptions).pipe(
      tap( () => this.service.notLoading() ),
      catchError(this.handleError<Service>('Sell Service'))
    );
  }

  updateProducts(product: Product): Observable<Product> {
    this.service.Loading();
    return this.http.put<Product>(this.apiUrl + 'product/update', product, this.httpOptions).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<Product>('Update Product'))
    );
  }

  updateServices(service: Service): Observable<Service> {
    this.service.Loading();
    return this.http.put<Service>(this.apiUrl + 'service/update', service, this.httpOptions).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<Service>('Update Service'))
    );
  }

  deleteProduct(product: Product): Observable<Product> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions =
      {fromObject: {businessname: this.auth.getUser().bizname, productkey: product.productkey}} as HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.post<Product>(this.apiUrl + 'product/actions', product, options).pipe(
      tap( () => this.service.notLoading()),
      catchError(this.handleError<Product>('Delete Operations'))
    );
  }

  deleteService(service: Service): Observable<Service> {
    this.service.Loading();
    return this.http.post<Service>(this.apiUrl + 'service/actions', service, this.httpOptions).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<Service>('Delete Service'))
    );
  }

  redirect(url: string) {
    this.service.Loading();
    this.router.navigate([`${this.auth.getUser().bizname}/${url}`]);
    this.service.notLoading();
  }

  searchProducts(term): Observable<Product> {
    this.httpOptions.params.append('query', term);
    return this.http.get<Product>(this.apiUrl, this.httpOptions).pipe(
      tap(() => console.log()),
      catchError(this.handleError<Product>('search products'))
    );
  }

  getDebtors(): Observable<Debtor[]> {
    this.service.Loading();
    return this.http.get<Debtor[]>(this.apiUrl + 'debtor/getdebtor', this.httpOptions).pipe(
      tap (() => this.service.notLoading() ),
      catchError(this.handleError<Debtor[]>('Get Debtors'))
    );
  }

  clearDebt(debtor: Debtor): Observable<Debtor> {
    this.service.Loading();
    return this.http.post<Debtor>(this.apiUrl + 'debtor/cleardebtor ', debtor, this.httpOptions).pipe(
      tap (() => this.service.notLoading()),
      catchError(this.handleError<Debtor>('Get Debtors'))
    );
  }

  viewUserHistory(id: string): Observable<any> {
    this.service.Loading();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const httpParams: HttpParamsOptions = {fromObject: {businessname: this.auth.getUser().bizname, id: id}} as
      HttpParamsOptions;
    const options = {params: new HttpParams(httpParams), headers: headers};
    return this.http.get<any>(this.apiUrl + 'staff/getstaffhistory', options).pipe(
      tap(() => this.service.notLoading()),
      catchError(this.handleError<any>('Get user history'))
    );
  }

  getProductagainstSales(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.httpOptions).pipe(
      catchError(this.handleError<any>('Get data'))
    );
  }

  getSalesChart(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'chart/saleschart', this.httpOptions).pipe(
      catchError(this.handleError<any>('Get data'))
    );
  }

  getNotifications(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'functions/notification', this.httpOptions);
  }
}
