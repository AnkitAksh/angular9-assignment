import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService) { }
  products: Product[] = [];
  isGrid: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();
  initialProducts: any;

  ngOnInit(): void {
    this.isGrid = true;
    this.initProducts();
  }

  initProducts() {
    this.productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this.initialProducts = data.slice(0, 40).map(product => {
        return { price: Math.floor(Math.random() * 1000 + 1), id: product.id, title: product.title, thumbnailUrl: product.thumbnailUrl };
      });
      this.products = [...this.initialProducts];
    });
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
        this.products = [...this.initialProducts];
        break;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

}
