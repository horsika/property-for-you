import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(localStorage.getItem('token') !== null) {
      const authToken = localStorage.getItem('token');
      const authReq = req.clone({setHeaders: {Authorization: `Bearer ${authToken}`}});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
