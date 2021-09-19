import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService implements CanActivate {
  constructor(private router:Router) {}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {
    let userId = localStorage.getItem('userId');
    if (userId) return true;

    alert("Please login")
    this.router.navigate(["/auth/login"], {queryParams:{returnUrl:state.url}})
    return false;
  }
}
