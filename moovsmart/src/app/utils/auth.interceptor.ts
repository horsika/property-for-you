import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(localStorage.getItem('token') !== null) {
      const authToken = localStorage.getItem('token');
      const authReq = req.clone({setHeaders: {Authorization: `Bearer ${authToken}`}});
      return next.handle(authReq).pipe(
        tap(event => {
          if (event instanceof HttpErrorResponse && event.error.errorCode === 'EXPIRED_TOKEN') {
              localStorage.removeItem('token');
            }
        }));
    } else {
      return next.handle(req);
    }
  }
}
