export class ChartModel {
  product: Product;
  service: Service;
}

class Product {
  labels: Array<number>;
  data: Array<number>;
}

class Service {
  labels: Array<number>;
  data: Array<number>;
}
