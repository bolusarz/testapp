import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './user account/register/register.component';
import {LoginComponent} from './user account/login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './Guards/auth.guard';
import {ProductComponent} from './product/product.component';
import {SidebarComponent} from './directives/sidebar/sidebar.component';
import {AddproductComponent} from './product/addproduct/addproduct.component';
import {AddServiceComponent} from './product/add-service/add-service.component';
import {LogoutComponent} from './user account/logout.component';
import {AddStaffComponent} from './Staff/add-staff/add-staff.component';
import {AddSaleComponent} from './sale/add-sale/add-sale.component';
import {ViewproductComponent} from './product/viewproduct/viewproduct.component';
import {ViewProductByCategoryComponent} from './product/viewproduct/view-product-by-category/view-product-by-category.component';
import {ViewProductByBrandComponent} from './product/viewproduct/view-product-by-brand/view-product-by-brand.component';
import {ViewProducthistoryComponent} from './product/viewproduct/view-producthistory/view-producthistory.component';
import {ViewServiceComponent} from './product/view-service/view-service.component';
import {ViewServiceHistoryComponent} from './product/view-service-history/view-service-history.component';
import {ViewSalesComponent} from './sale/view-sales/view-sales.component';
import {SellServiceComponent} from './sale/sell-service/sell-service.component';
import {ViewSaleByProductComponent} from './sale/view-sale-by-product/view-sale-by-product.component';
import {DebtorComponent} from './sale/debtor/debtor.component';
import {BusinessGuard} from './Guards/business.guard';
import {ViewStaffHistoryComponent} from './view-staff-history/view-staff-history.component';

const childRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'dashboard', component: DashboardComponent, canActivate: [BusinessGuard]},
  {path: 'product', component: ProductComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'product/add-product', component: AddproductComponent},
  {path: 'product/add-service', component: AddServiceComponent},
  {path: 'add-staff', component: AddStaffComponent},
  {path: 'add-sales', component: AddSaleComponent},
  {path: 'view-product', component: ViewproductComponent},
  {path: 'view-services', component: ViewServiceComponent},
  {path: 'view-product/by-category', component: ViewProductByCategoryComponent},
  {path: 'view-product/by-brand', component: ViewProductByBrandComponent},
  {path: 'view-product-history/:productkey', component: ViewProducthistoryComponent},
  {path: 'view-service-history/:service', component: ViewServiceHistoryComponent},
  {path: 'view-sales', component: ViewSalesComponent},
  {path: 'offer-services', component: SellServiceComponent},
  {path: 'view-sales/:productkey', component: ViewSaleByProductComponent},
  {path: 'view-debtors', component: DebtorComponent},
  {path: 'user-history/:id/:user', component: ViewStaffHistoryComponent}
];


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: ':bizname', component: SidebarComponent, children: childRoutes, canActivate: [AuthGuard]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
