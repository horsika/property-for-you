import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class PremiumGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if(token) {
      let dToken = JSON.parse(atob(token.split('.')[1]));
      let role = dToken.role;

      if(role === 'ROLE_PREMIUM') {
        return true;
      } else {
        this.router.navigate(['/payment']);
        return false;
      }

    } else {
      this.router.navigate(['/register']);
      return false;
    }
  }

}
