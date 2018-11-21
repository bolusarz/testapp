export class Properties {
  num_product: number;
  num_service: number;
  num_staff: number;
  num_debtors: number;

  constructor(obj?: any) {
    this.num_product = obj && obj.num_product || null;
    this.num_service = obj && obj.num_service || null;
    this.num_staff = obj && obj.num_staff || null;
    this.num_debtors = obj && obj.num_debtors || null;
  }
}
