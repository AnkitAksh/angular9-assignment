import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { ProductsComponent } from './products/products.component';
import { BannerComponent } from './banner/banner.component';


const routes: Routes = [
  { path: 'banner', component: BannerComponent },
  { path: 'counter', component: CounterComponent },
  { path: 'product', component: ProductsComponent },
  { path: '', redirectTo: '/banner', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [BannerComponent, CounterComponent, ProductsComponent];
