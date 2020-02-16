import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('2s 100ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }
  products: Product[] = [];
  isGrid: boolean;

  ngOnInit(): void {
    this.products = this.getProducts();
    this.isGrid = true;
  }

  getProducts() {
    return this.productService.getProductsList();
  }

  filterFunc(val) {
    switch (val) {
      case '1':
        this.products.sort((a, b) => b.price - a.price);
        break;
      case '2':
        this.products.sort((a, b) => a.price - b.price);
        break;
      case '3':
        this.products = this.getProducts();
        break;
    }
  }

}
