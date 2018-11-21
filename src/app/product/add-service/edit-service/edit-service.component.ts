import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../../Models/service.model';


@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  editserviceform: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public service: Service, private fb: FormBuilder,
              private dialogref: MatDialogRef<EditServiceComponent>) {
    this.editserviceform = this.fb.group({
      'service_name': [this.service.service_name, Validators.required],
      'price': [this.service.price, Validators.required]
    });
  }

  ngOnInit() {
  }

  save(form) {
    this.dialogref.close(form);
  }

  cancel() {
    this.dialogref.close();
  }

}
