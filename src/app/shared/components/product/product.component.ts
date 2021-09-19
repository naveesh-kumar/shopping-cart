import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { myCart } from 'src/app/interface/myCart';
import { Product } from 'src/app/interface/product';
import { ProductListService } from 'src/app/services/product-list.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  count: number = 0;


  constructor(
    private route: Router,
    private usersService: UsersService,
    private productService: ProductListService
  ) {}

  ngOnInit(): void {}

  navigate(id: any) {
    this.route.navigate(['product/details', id]);
  }

  myCartUpdate(product: any) {
    let id = this.usersService.getloggedInUserId();
    if(id){
      let p = new myCart(product, 1, 'S', product.price);
      this.usersService.addToCart(p, +id)
      .subscribe(data=>{})
    }
    else{
      window.alert("Please login");
      this.route.navigate(['/auth/login'])
    }  

  }

  
}
