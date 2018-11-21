export class Customer {
  id: number;
  name: string;
  address: string;
  phone_number: number;
  email: string;

  constructor(obj: any) {
    this.id = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.address = obj && obj.address || null;
    this.phone_number = obj && obj.phone_number || null;
    this.email = obj && obj.email || null;
  }
}
