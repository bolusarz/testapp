export class ViewSale {
  product: Product[];
  service: Service[];
}

class Product {
  id: number;
  products: string;
  total_price: string;
  customer_name: string;
  amount_paid: number;
  remark: string;
  status: string;
  date_added: string;
  time_added: string;
  user: string;
}

class Service {
  id: number;
  services: string;
  amount_paid: number;
  total_price: number;
  customer_name: string;
  customer_email: string;
  customer_phonenumber: string;
  discount: number;
  status: string;
  date_added: string;
  time_added: string;
  user: string;
}
