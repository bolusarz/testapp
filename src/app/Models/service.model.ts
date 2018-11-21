import { Admin } from './admin';
import {Customer} from './customer.model';

export class Service {
  id: number;
  service_name: any;
  price: number;
  amount_paid: number;
  discount: number;
  customer: Customer;
  user: Admin;
  status: boolean;
  message: string;
  date_added: string;
  total_price: number;
  date_updated: string;
  time_added: string;

  constructor(obj?: any) {
    this.id             = obj && obj.id || null;
    this.service_name   = obj && obj.service_name || null;
    this.price          = obj && obj.price || null;
    this.amount_paid    = obj && obj.amount_paid || null;
    this.discount       = obj && obj.discount || null;
    this.customer       = obj && obj.customer || null;
    this.user           = obj && obj.user || null;
    this.total_price    = 0;
  }
}
