import { Component, OnInit } from '@angular/core';
import {ProductService} from '../Services/product.service';
import {ActivatedRoute} from '@angular/router';
import {ViewSale} from '../Models/view-sale';

@Component({
  selector: 'app-view-staff-history',
  templateUrl: './view-staff-history.component.html',
  styleUrls: ['./view-staff-history.component.css']
})
export class ViewStaffHistoryComponent implements OnInit {
  public query: any;
  public details: ViewSale = new ViewSale();
  public p = 1;
  pc = 1;
  constructor(private pservice: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.query = {id: params['id'], user: params['user']});
    this.pservice.viewUserHistory(this.query.id).subscribe(data => this.details = data);
  }

  ngOnInit() {
  }


}
