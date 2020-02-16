import { Injectable } from '@angular/core';
import * as data from '../../assets/products.json';
import { Product } from './product.model.js';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  productList: Product[] = [];

  getProductsList() {
    this.productList = (data as any).default;
    return [...this.productList];
  }
}
