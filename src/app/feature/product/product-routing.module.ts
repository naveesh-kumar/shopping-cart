import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ViewCartComponent } from './pages/view-cart/view-cart.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'view-cart',
    component: ViewCartComponent,
    canActivate:[UserAuthenticationService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
