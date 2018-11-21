export class History {
  date: string;
  items: any;

  constructor(obj?: any) {
    this.date = obj && obj.date || null;
    this.items = obj && obj.items || null;
  }
}
