export class SalesMeasure {
  name: string;
  quantity: number;
  price: number;
  status: boolean;

  constructor(obj?: any) {
    this.name = obj && obj.name || null;
    this.price = obj && obj.price || null;
    this.quantity = obj && obj.quantity || null;
  }
}
