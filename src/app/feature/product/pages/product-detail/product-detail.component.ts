import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { myCart } from 'src/app/interface/myCart';
import { UsersService } from 'src/app/services/users.service';
import { ProductListService } from '../../../../services/product-list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  products: any;
  cartProduct!:myCart;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductListService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((data: any) => {
          return this.productService.getProductById(+data['id']);
        })
      )
      .subscribe(
        (product) => {
          this.product = product;
          if (this.product) {
            this.getProductsByCategory(this.product.category);

            this.cartProduct=new myCart(
              this.product,
              1,
              'S',
              this.product.price
            )

          }
        },
        (error) => {
          if (window.confirm(error.message)) {
            this.router.navigate(['home']);
          }
        }
      );
  }

  getProductsByCategory(category: string) {
    this.productService
      .getProductsByCategory(category)
      .subscribe((products) => {
        this.products = products;
      });
  }
  
  updateProduct(value:any){
    if(typeof value=="number"){
      this.cartProduct.qty=value;
      this.cartProduct.price = this.product.price * value;
    }else{
      this.cartProduct.size=value;
    }
  }

  addToCart(){
    let userId = this.usersService.getloggedInUserId();
    if(userId){
      this.usersService.addToCart(this.cartProduct, +userId).subscribe(data=>{})
    }else{
      this.router.navigate(["/auth/login"]);
    }
  }
}
