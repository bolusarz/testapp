import {Component, OnInit} from '@angular/core';
import {ProductService} from '../Services/product.service';
import {Properties} from '../Models/properties.model';
import {Admin} from '../Models/admin';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  props: Properties = new Properties();
  staff: Admin[] = [];
  constructor(private pservice: ProductService, private router: Router) {
    this.pservice.getBusinessProperties().subscribe(
      data => this.props = data,
      error1 => console.log(error1)
    );
    this.pservice.auth.getStaff().subscribe(data => this.staff = data);

  }

  ngOnInit() {}

  deleteUser(user: Admin) {
    this.pservice.auth.deleteUser(user).subscribe(data => {
      if (data.status) {
        this.pservice.service.success(data.message, 'Delete User');
        this.staff.unshift(user);
      } else {
        this.pservice.service.error(data.message, 'Delete User');
      }
    });
  }

  view_user_history(user: string, id: string) {
    this.router.navigate([`${this.pservice.auth.getUser().bizname}/user-history`, id,  user]);
  }
}
