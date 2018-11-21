import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { CookieService } from 'angular2-cookie/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user account/register/register.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './user account/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './directives/sidebar/sidebar.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';
import { ViewproductComponent } from './product/viewproduct/viewproduct.component';
import { AddServiceComponent } from './product/add-service/add-service.component';
import { ViewServiceHistoryComponent } from './product/view-service-history/view-service-history.component';
import { EditProductComponent } from './product/addproduct/edit-product/edit-product.component';
import { LogoutComponent } from './user account/logout.component';
import { AddStaffComponent } from './Staff/add-staff/add-staff.component';
import { AddSaleComponent } from './sale/add-sale/add-sale.component';
import { AddSalesmeasureComponent } from './sale/add-salesmeasure/add-salesmeasure.component';
import { SalesDisplayComponent } from './sale/sales-display/sales-display.component';
import { SearchProductComponent } from './search-product.component';
import { ViewProductByIdComponent } from './product/viewproduct/view-product-by-id/view-product-by-id.component';
import { ViewProductByCategoryComponent } from './product/viewproduct/view-product-by-category/view-product-by-category.component';
import { ViewProductByBrandComponent } from './product/viewproduct/view-product-by-brand/view-product-by-brand.component';
import { ExtraInfoComponent } from './sale/extra-info/extra-info.component';
import { ViewProducthistoryComponent } from './product/viewproduct/view-producthistory/view-producthistory.component';
import { ViewServiceComponent } from './product/view-service/view-service.component';
import { EditServiceComponent } from './product/add-service/edit-service/edit-service.component';
import { SellServiceComponent } from './sale/sell-service/sell-service.component';
import { ViewSalesComponent } from './sale/view-sales/view-sales.component';
import { ViewSaleByProductComponent } from './sale/view-sale-by-product/view-sale-by-product.component';
import { ViewStaffComponent } from './Staff/view-staff/view-staff.component';
import { DebtorComponent } from './sale/debtor/debtor.component';
import { ViewStaffHistoryComponent } from './view-staff-history/view-staff-history.component';
import { DisplayChartsComponent } from './display-charts/display-charts.component';
import { FormatquantityPipe } from './pipes/formatquantity.pipe';
import { ForgotPasswordComponent } from './user account/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    AddproductComponent,
    ProductComponent,
    ViewproductComponent,
    AddServiceComponent,
    ViewServiceHistoryComponent,
    EditProductComponent,
    LogoutComponent,
    AddStaffComponent,
    AddSaleComponent,
    AddSalesmeasureComponent,
    SalesDisplayComponent,
    SearchProductComponent,
    ViewProductByIdComponent,
    ViewProductByCategoryComponent,
    ViewProductByBrandComponent,
    ExtraInfoComponent,
    ViewProducthistoryComponent,
    ViewServiceComponent,
    EditServiceComponent,
    SellServiceComponent,
    ViewSalesComponent,
    ViewSaleByProductComponent,
    ViewStaffComponent,
    DebtorComponent,
    ViewStaffHistoryComponent,
    DisplayChartsComponent,
    FormatquantityPipe,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FlexLayoutModule,
    SnotifyModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ChartsModule
  ],
  providers: [
    {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddSalesmeasureComponent, ExtraInfoComponent, ViewProductByIdComponent, EditProductComponent,
    EditServiceComponent, ForgotPasswordComponent]
})
export class AppModule { }
