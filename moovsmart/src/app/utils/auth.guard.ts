import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {

  }

  async canActivate(): Promise<boolean> {
    if(await this.userService.isGetSuccessful()) {
      return true;
    } else {
      this.router.navigate(["/register"]);
      return false;
    }
  }

}
