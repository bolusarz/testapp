import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../Services/product.service';
import {Debtor} from '../../Models/debtor.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-debtor',
  templateUrl: './debtor.component.html',
  styleUrls: ['./debtor.component.css']
})
export class DebtorComponent implements OnInit {
  debtors: Debtor[] = [];
  constructor(private pservice: ProductService, private route: Router) {
    this.pservice.getDebtors().subscribe(data => this.debtors = data);
  }

  ngOnInit() {
  }

  clear(debtor: Debtor) {
    console.log(debtor);
    this.pservice.clearDebt(debtor).subscribe(data => {
      this.pservice.service.success(data.message, 'Debt Cleared');
      this.debtors.unshift(debtor);
    });
  }

}
