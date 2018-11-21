import { Admin } from './admin';
import {SalesMeasure} from './sales_measure.model';


export class Product {
  id: string;
  product_name: string;
  category: string;
  brand: string;
  quantity: number;
  product_measure: string;
  sales_measure: SalesMeasure[];
  total_pieces: number;
  quantity_pieces: number;
  price: number;
  selling_price: number;
  user: Admin;
  picture: any;
  message: string;
  status: boolean;
  productkey: string;
  date_added: string;
  time_added: string;

  constructor(obj?: any) {
    this.id               = obj && obj.id || null;
    this.product_name     = obj && obj.product_name || null;
    this.category         = obj && obj.category || null;
    this.brand            = obj && obj.brand || null;
    this.product_measure  = obj && obj.product_measure || null;
    this.quantity         = obj && obj.quantity || null;
    this.quantity_pieces  = obj && obj.quantity_pieces || null;
    this.picture          = obj && obj.picture || null;
    this.price            = obj && obj.price || null;
    this.selling_price    = obj && obj.selling_price || null;
    this.user             = obj && obj.user || null;
    this.quantity && this.quantity_pieces ? this.total_pieces = this.quantity * this.quantity_pieces : this.total_pieces = null;
  }
}


