import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {ActivatedRoute} from '@angular/router';
import {Service} from '../../Models/service.model';

@Component({
  selector: 'app-view-service-history',
  templateUrl: './view-service-history.component.html',
  styleUrls: ['./view-service-history.component.css']
})
export class ViewServiceHistoryComponent implements OnInit {
  services: Service[] = [];
  dates = [];
  id = '';
  public p = 1;
  public pc = 1;
  constructor(private pservice: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['service'];
    });
    console.log(this.id);
    this.pservice.getServiceHistory(this.id).subscribe(data => {
      if (data) {
        this.services = data;
      }
      this.unique(this.services, this.dates);
    });
  }

  unique(service: any, dates: any) {
    service.forEach(function (temp) {
      if (!dates.includes(temp.date_added)) {
        dates.push(temp.date_added);
      }
    });
  }

  getServices(date) {
    return this.services.filter(temp => temp.date_added === date);
  }
}
