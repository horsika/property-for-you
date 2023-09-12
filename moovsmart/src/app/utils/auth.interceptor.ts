import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token !== null
      && JSON.parse(atob(token.split('.')[1])).exp > Math.floor(Date.now() / 1000)) { //if expired, don't even send
        const authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
        return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
