import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  template: `
    <h2 mat-dialog-title>Forgot Password</h2>
    <mat-dialog-content>
      <mat-form-field class="full-width">
        <mat-label>Enter Email </mat-label>
        <input matInput type="email" formControlName="email" title="email">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button (click)="close()">Close</button>
      <button mat-raised-button (click)="save()">Submit</button>
    </mat-dialog-actions>
  `,
  styles: []
})
export class ForgotPasswordComponent implements OnInit {
  email = new FormControl();
  constructor(private dialogRef: MatDialogRef<ForgotPasswordComponent>) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(this.email.value);
  }

  close() {
    this.dialogRef.close();
  }

}
