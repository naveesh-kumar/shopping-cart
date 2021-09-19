import { Component, OnInit } from '@angular/core';
import { myCart } from 'src/app/interface/myCart';
import { MyCartList } from 'src/app/interface/myCartList';
import { MycartService } from 'src/app/services/mycart.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  userId: any;
  cartProducts: any;
  paginationConfig: any = {};
  totalPrice:number=0;

  constructor(
    private usersService: UsersService,
    private cartSubjectService: MycartService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userId ? this.showCartProduct() : window.alert('Please login');
    this.cartSubjectService.getUpdatedCart().subscribe((data) => {
      this.cartProducts = data;

      this.paginationConfig = {
        itemsPerPage: 3,
        currentPage: 1,
        totalItems: data.length,
      };

    });
  }

  showCartProduct() {
    this.usersService.getUserCartById(+this.userId).subscribe((myProducts) => {
      this.cartSubjectService.updateCart(myProducts);
      this.updateTotalPrice(myProducts);
    });
  }

  removeProduct(pid: number) {
    this.usersService
      .removeProductFromCart(pid, +this.userId)
      .subscribe((user: any) => {
        this.cartSubjectService.updateCart(user.myProducts);
        this.updateTotalPrice(user.myProducts);
      });
  }

  updateProduct(value: any, cartProduct: myCart, index: number) {
    let p = new myCart(
      cartProduct.product,
      typeof(value)=="number"? value:cartProduct.qty,
      typeof(value)!="number"? value:cartProduct.size,
      typeof(value)=="number"? cartProduct.product.price*value : cartProduct.price
    );

    cartProduct.price = p.price;
    cartProduct.qty = p.qty;
    cartProduct.size = p.size;

    this.usersService
      .updateCartProduct(this.userId, index, p)
      .subscribe((data:any) => {
        this.updateTotalPrice(data.myProducts);
      });
  }

  updateTotalPrice(myProducts:any){
    this.totalPrice=+((new MyCartList(myProducts).totalPrice).toFixed(2));
  }


  onPageChange(value: number) {
    this.paginationConfig.currentPage = value;
  }
}
