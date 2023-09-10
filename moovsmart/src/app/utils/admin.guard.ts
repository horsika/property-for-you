import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }
  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if(token) {
      let dToken = JSON.parse(atob(token.split('.')[1]));
      let role = dToken.role;
      return role === 'ROLE_ADMIN';
    } else {
      this.router.navigate(['/homepage']);
      return false;
    }
  }

}
