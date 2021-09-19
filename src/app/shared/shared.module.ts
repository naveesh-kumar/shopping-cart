import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { ProductComponent } from './components/product/product.component';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [BannerComponent, ProductComponent, ProductSliderComponent, HeaderComponent],
  imports: [CommonModule, SlickCarouselModule],
  exports:[BannerComponent, ProductComponent, ProductSliderComponent, HeaderComponent]
})
export class SharedModule {}
