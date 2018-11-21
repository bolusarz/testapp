import { Component, OnInit } from '@angular/core';
import {ProductService} from '../Services/product.service';

@Component({
  selector: 'app-display-charts',
  templateUrl: './display-charts.component.html',
  styleUrls: ['./display-charts.component.css']
})
export class DisplayChartsComponent implements OnInit {
  public ChartOptions = {
    responsive: true,
  };
  public increase  = 0;
  public status = '';
  public ChartColors = [{
    backgroundColor: 'transparent',
    borderColor: '#fff',
    pointBackgroundColor: '#fff',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: 'transparent',
    borderColor: '#4b4b4b',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  public ChartLabels = [];
  public ChartType = 'line';
  public ChartData = [{data: [], label: 'Product Sales for this week'}, {data: [], label: 'Service Sales for this week'}];

  constructor(private pservice: ProductService) {
  }

  ngOnInit() {
    this.pservice.getSalesChart().subscribe(data => {
      if (data) {
        this.ChartData[0].data = data.product;
        this.ChartData[1].data = data.service;
        this.ChartLabels = data.labels;
        this.increase = data.percentage;
        this.status = data.raise;
      }
    });
  }


}
