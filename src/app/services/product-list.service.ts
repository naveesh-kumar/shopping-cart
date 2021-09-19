import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  url: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.url);
  }

  getProductById(id: number) {
    return this.http.get(this.url + '/' + id).pipe(
      map((data) => {
        if (data) return data;
        throw new Error('Not a valid product');
      }),
      catchError(this.errorHandler)
    );
  }

  getProductsByCategory(category: string) {
    return this.http.get(this.url).pipe(
      map((products: any) => {
        let newdata = products.filter((product: any) => {
          return product.category == category;
        });
        return newdata;
      })
    );
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
