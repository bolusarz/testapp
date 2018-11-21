import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../Services/product.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  currentUser: string;
  bizname: string;
  perm = false;
  notifications: Array<any> = [];
  constructor(private auth: AuthService, private route: ActivatedRoute, private pservice: ProductService) {
    this.route.params.subscribe(params => {this.bizname = params['bizname']; });
    this.pservice.getNotifications().subscribe(data => this.notifications = data);
  }

  ngOnInit() {
    this.currentUser = this.auth.getUser().name;
    this.auth.confirm_business(this.bizname);
    this.canActivate();
  }

  canActivate() {
    if (this.auth.getUser().position !== 'Staff') {
      this.perm = true;
    }
  }
}
