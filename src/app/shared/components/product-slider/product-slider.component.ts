import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit, OnDestroy {
  @Input() products: any = [];
  slideConfig = { slidesToShow: 4, slidesToScroll: 2 };
  messageSubscription!: Subscription;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.messageSubscription = this.userService.message
      .asObservable()
      .subscribe((message) => {
        window.alert(message);
      });
  }

  productById(idex: number, item: any) {
    return item.title;
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }
}
