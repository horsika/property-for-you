import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      let dToken = JSON.parse(atob(token.split('.')[1]))
      let expiration = dToken.exp;
      if (expiration < Math.floor(Date.now() / 1000)) {
        localStorage.removeItem('token');
        this.router.navigate(['/register']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/register']);
      return false;
    }
  }
}
