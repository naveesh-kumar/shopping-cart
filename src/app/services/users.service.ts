import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { myCart } from '../interface/myCart';
import { Product } from '../interface/product';
import { MycartService } from './mycart.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url: string = 'http://localhost:3000/users';
  message = new Subject<string>();

  constructor(
    private http: HttpClient,
    private myCartSubjectService: MycartService
  ) {}

  getloggedInUserId() {
    return localStorage.getItem('userId');
  }

  userLogin(username: string, password: string) {
    return this.http.get(this.url).pipe(
      map((users: any) => {
        for (let u of users) {
          if (u.username == username && u.password == password) {
            window.localStorage.setItem('userId', u.id);
            return u;
          }
        }
      })
    );
  }

  getuserById(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  getUserCartById(uid: number) {
    return this.http.get(this.url + '/' + uid).pipe(
      map((users: any) => {
        return users?.myProducts;
      })
    );
  }

  removeProductFromCart(pid: number, uid: number) {
    return this.getUserCartById(uid).pipe(
      switchMap((myProducts: any) => {
        let updatedProducts = myProducts.filter((product: any) => {
          return product.product.id !== pid;
        });
        return this.http.patch(this.url + '/' + uid, {
          myProducts: updatedProducts,
        });
      })
    );
  }

  updateCartProduct(uid: number, index: number, product: any) {
    return this.getUserCartById(uid).pipe(
      switchMap((myProducts: any) => {
        myProducts[index] = product;
        return this.http.patch(this.url + '/' + uid, {
          myProducts: myProducts,
        });
      })
    );
  }


  addToCart(myCartProduct: myCart, uid: number) {  
  return this.getUserCartById(uid).pipe(
      switchMap((myProducts: any) => {
        if (myProducts) {
          let productExists = myProducts.filter((prod: any) => {
            return prod.product.id === myCartProduct.product.id;
          });

          if (productExists.length <= 0) {
            myProducts.push(myCartProduct);
            this.message.next(
              `Product ${myCartProduct.product.title} successfully added to the cart`
            );
          } else {
            this.message.next(
              `Product ${myCartProduct.product.title} already exists in the cart`
            );
          }
        } else {
          myProducts = [myCartProduct];
        }
        this.myCartSubjectService.updateCart(myProducts);
        return this.http.patch(this.url + '/' + uid, {
          myProducts: myProducts,
        });
      })
    );
  }
}
