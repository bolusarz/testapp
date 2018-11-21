export class SalesInfo {
  customer_name: string;
  discount: number;
  remark: string;
  amount_paid: number;
  total: number;

  constructor(obj?: any) {
    this.customer_name = obj && obj.customer_name || null;
    this.discount = obj && obj.discount || null;
    this.remark = obj && obj.remark || null;
    this.amount_paid = obj && obj.amount_paid || null;
    this.total = obj && obj.total || null;
  }
}
