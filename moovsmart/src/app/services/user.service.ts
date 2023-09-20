import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest, RegisterRequestModel} from "../models/register-request.model";
import {AuthRequest, AuthRequestModel} from "../models/auth-request-model";
import {AuthResponseModel} from "../models/auth-response.model";
import {environment} from "../../environments/environment";
import {Observable, Subject, Subscriber} from "rxjs";
import {EmailChangeModel} from "../models/email-change.model";
import {MyAccountModel} from "../models/my-account.model";
import {PasswordChangeModel} from "../models/password-change.model";
import {AdminService} from "./admin.service";
import firebase from "firebase/compat";
import {Auth, signInWithPopup} from "@angular/fire/auth";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

const BASE_URL = environment.BASE_URL + '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenIsPresent = new Subject<boolean>();

  constructor(private http: HttpClient, private adminService: AdminService, private auth: Auth) {
  }

  registerUser(data: RegisterRequestModel) {
    return this.http.post<AuthResponseModel>(BASE_URL + '/register', data);
  }

  loginUser(data: AuthRequestModel) {
    return this.http.post<AuthResponseModel>(BASE_URL + '/authentication', data);
  }

  removeToken() {
    localStorage.removeItem('token');
    this.tokenIsPresent.next(false);
    this.adminService.isAdmin.next(false);
  }

  getMyAccountDetails(): Observable<MyAccountModel> {
    return this.http.get<MyAccountModel>(BASE_URL + '/account-details');
  }

  changeEmail(data: EmailChangeModel) {
    return this.http.post(BASE_URL + '/change-email', data);
  }

  changePassword(data: PasswordChangeModel) {
    return this.http.post(BASE_URL + '/change-password', data);
  }

  uploadProfilePicture(data: FormData) {
    return this.http.post(BASE_URL + '/upload-profile-pic', data);
  }

  loginWithGoogle(): Observable<string> {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    return new Observable<string>(observer => {
      signInWithPopup(this.auth, provider).then(result => {
        const user = result.user;
        const email = user.providerData[0].email;
        this.sendLoginRequest(observer, email);
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  sendLoginRequest(observer: Subscriber<string>, email: string) {
    let authRequest = new AuthRequest();
    authRequest.email = email;
    authRequest.password = null;
    this.loginUserWithSocialMedia(authRequest).subscribe(response => {
      observer.next(response);
      observer.complete();
    }, error => {
      observer.error(error);
    });
  }

  private loginUserWithSocialMedia(authRequest: AuthRequest): Observable<string> {
    return this.http.post<string>(`${BASE_URL}/social-login`, authRequest);
  }
}
