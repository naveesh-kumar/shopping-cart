import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule} from '@angular/forms'

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListService } from '../../services/product-list.service';
import { ViewCartComponent } from './pages/view-cart/view-cart.component';
import { UsersService } from 'src/app/services/users.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { QuantityComponent } from './components/quantity/quantity.component';
import { SizeComponent } from './components/size/size.component';

@NgModule({
  declarations: [ProductDetailComponent, ViewCartComponent, QuantityComponent, SizeComponent],
  imports: [CommonModule, ProductRoutingModule, SharedModule, FormsModule, NgxPaginationModule],
  providers: [ProductListService, UsersService],
})
export class ProductModule {}
