export class Category {
  id: string;
  category_name: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null ;
    this.category_name = obj && obj.category_name || null;
  }
}
