import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MycartService {
  constructor() {}

  myCartCountSubject = new Subject();

  updateCart(count: any) {
    this.myCartCountSubject.next(count);
  }

  getUpdatedCart(): Observable<any> {
    return this.myCartCountSubject.asObservable();
  }
}
