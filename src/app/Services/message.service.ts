import { Injectable } from '@angular/core';
import { SnotifyService } from 'ng-snotify';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private service: SnotifyService, private spinner: NgxSpinnerService) {

  }

  success(message: string, title ?: string) {
    this.service.success(message, title, {
      timeout: 15000,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      position: 'centerTop',
      bodyMaxLength: 200
    });
  }

  error(message: string, title ?: string) {
    this.service.error(message, title,  {
      timeout: 15000,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      position: 'centerTop',
      bodyMaxLength: 200
    });
  }


  confirm(message: string, title ?: string) {
    let confirm = false;
    this.service.confirm(message, title, {
      timeout: 15000,
      closeOnClick: true,
      pauseOnHover: true,
      showProgressBar: false,
      position: 'centerCenter',
      buttons: [
        {text: 'Yes please!', action: (toast) => {this.service.remove(toast.id); confirm = true; }},
        {text: 'No, Made a mistake', action: (toast) => this.service.remove(toast.id)}
      ]
    });
    return confirm;
  }

  Loading() {
    this.spinner.show();
  }

  notLoading() {
    this.spinner.hide();
  }
}
