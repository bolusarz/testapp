import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-extra-info',
  template: `
    <h2 mat-dialog-title>Extra Info</h2>
    <mat-dialog-content [formGroup]="extra_info">

      <mat-form-field class="full-width">
        <mat-label> Customer Name </mat-label>
        <input matInput type="text" [formControl]="extra_info.controls['customer_name']" title="name">
      </mat-form-field>

      <mat-checkbox color="primary" (change)="_checked()"> Same as total price
      </mat-checkbox>

      <mat-form-field class="full-width">
        <mat-label> Amount Paid </mat-label>
        <input matInput type="number" [formControl]="extra_info.controls['amount_paid']" title="amount">
      </mat-form-field>

      <mat-form-field class="full-width">
        <mat-label> Remark </mat-label>
        <input matInput type="text" [formControl]="extra_info.controls['remark']" title="remark">
      </mat-form-field>

    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-raised-button (click)="close()">Close</button>
      <button mat-raised-button (click)="save()" [disabled]="extra_info.invalid">Save</button>
    </mat-dialog-actions>`
})
export class ExtraInfoComponent implements OnInit {
  public extra_info: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ExtraInfoComponent>,
              @Inject(MAT_DIALOG_DATA)public data: number) {
    this.extra_info = fb.group({
      'customer_name': [null],
      'remark': [null],
      'amount_paid': [null, Validators.compose([
        Validators.required,
        Validators.max(this.data)
      ])]
    });
  }

  _checked() {
    if (this.extra_info.get('amount_paid').value === this.data) {
      this.extra_info.get('amount_paid').setValue(null);
    } else {
      this.extra_info.get('amount_paid').setValue(this.data);
    }
  }

  save() {
    this.dialogRef.close(this.extra_info.value);
  }

  close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
