import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-salesmeasure',
  templateUrl: './add-salesmeasure.component.html',
  styleUrls: ['./add-salesmeasure.component.css']
})
export class AddSalesmeasureComponent implements OnInit {
  sales_measureform: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddSalesmeasureComponent>) {
    this.sales_measureform = fb.group({
      'name': [null, Validators.required],
      'quantity': [null, Validators.required],
      'price': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  save() {
      this.dialogRef.close(this.sales_measureform.value);
  }

  close() {
    this.dialogRef.close();
  }
}
