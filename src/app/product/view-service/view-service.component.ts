import { Component, OnInit } from '@angular/core';
import {Service} from '../../Models/service.model';
import {ProductService} from '../../Services/product.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {EditServiceComponent} from '../add-service/edit-service/edit-service.component';
import { SnotifyService } from 'ng-snotify';
import {Admin} from '../../Models/admin';
import { _ } from 'underscore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {
  services: Service[] = [];
  p = 1;
  constructor(private pservice: ProductService, private dialog: MatDialog, private service: SnotifyService,
              private router: Router) { }

  ngOnInit() {
    this.pservice.getServices().subscribe(
      data => this.services = data);
  }

  check_service(key: number) {
    return this.services.find(temp => temp.id === key);
  }

  update_service(service: Service) {
    this.check_service(service.id) ?
      this.services[this.services.indexOf(this.check_service(service.id))] = service : this.services.push(service);
  }

  edit(service: Service) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = service;
    this.dialog.open(EditServiceComponent, dialogConfig).afterClosed().subscribe(
      data => {
        if (data) {
          const newservice = new Service(data);
          newservice.id = service.id;
          newservice.user = new Admin();
          newservice.user.email = this.pservice.auth.getUser().email;
          newservice.user.business_name = this.pservice.auth.getUser().bizname;
          console.log(newservice);
          this.pservice.updateServices(newservice).subscribe(res => {
            if (res && res.status) {
              this.pservice.service.success(res.message, 'Update Service');
              this.update_service(newservice);
            } else {
              this.pservice.service.error('An Error occurred. Try again later or contact our help desk', 'Update Service');
            }
          });
        }
      });
  }

  delete(service: Service) {
    this.service.confirm(`Are you sure you want to delete ${service.service_name}`, 'Delete', {
      timeout: 15000,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      position: 'centerCenter',
      buttons: [
        {text: 'Yes please!', action: (toast) => {
            this.service.remove(toast.id);
            this.pservice.deleteService(service).subscribe(
              data => {
                if (data.status) {
                  this.pservice.service.success(data.message);
                  this.services = _.reject(this.services, function(temp) {return temp.id === service.id; });
                }
              }
            ); }},
        {text: 'No, Made a mistake', action: (toast) => this.service.remove(toast.id)}
      ]
    });
  }

  view_history(service: Service) {
    this.router.navigate([`${this.pservice.auth.getUser().bizname}/view-service-history`, service.id]);
  }

}
