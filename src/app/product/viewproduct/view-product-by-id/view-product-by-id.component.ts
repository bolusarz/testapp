import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Product} from '../../../Models/product';

@Component({
  selector: 'app-view-product-by-id',
  templateUrl: './view-product-by-id.component.html',
  styleUrls: ['./view-product-by-id.component.css']
})

export class ViewProductByIdComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product,
              private dialogRef: MatDialogRef<ViewProductByIdComponent>) {
  }
  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
