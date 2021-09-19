import { Component, OnInit } from '@angular/core';
import { MycartService } from 'src/app/services/mycart.service';
import { ProductListService } from 'src/app/services/product-list.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: any;
  constructor(
    private productService: ProductListService,
    private usersService: UsersService,
    private myCartSubjectService: MycartService
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    let userId = window.localStorage.getItem('userId');
    if (userId) {
      this.usersService.getUserCartById(+userId).subscribe((cartProducts) => {
        this.myCartSubjectService.updateCart(cartProducts);
      });
    }
  }
}
