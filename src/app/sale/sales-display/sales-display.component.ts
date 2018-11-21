import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


import {Sales} from '../../Models/sales.model';

@Component({
  selector: 'app-sales-display',
  templateUrl: './sales-display.component.html',
  styleUrls: ['./sales-display.component.css']
})
export class SalesDisplayComponent implements OnInit {
  @Input() sale: Sales;
  @Output() onselectedSale: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.onselectedSale = new EventEmitter<Sales>();
  }

  clicked() {
    this.onselectedSale.emit({sale: this.sale, operation: 'edit'});
  }

  delete() {
    this.onselectedSale.emit({sale: this.sale, operation: 'delete'});
  }

  ngOnInit() {
  }

}
