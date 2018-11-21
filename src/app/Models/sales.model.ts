import {SalesMeasure} from './sales_measure.model';
import {Admin} from './admin';

export class Sales {
  product: string;
  quantity: number;
  price: number;
  sales_measure: SalesMeasure;
  user: Admin;

  constructor(obj: any) {
    this.product = obj && obj.product || null;
    this.quantity = obj && obj.quantity || null;
    this.price = obj && obj.price || null;
    this.sales_measure = obj && obj.sales_measure || null;
    this.user = obj && obj.user || null;
  }
}
