import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequestModel} from "../models/register-request.model";
import {AuthRequest, AuthRequestModel} from "../models/auth-request-model";
import {AuthResponseModel} from "../models/auth-response.model";
import {environment} from "../../environments/environment";
import {Observable, Subject, Subscriber} from "rxjs";
import {EmailChangeModel} from "../models/email-change.model";
import {MyAccountModel} from "../models/my-account.model";
import {PasswordChangeModel} from "../models/password-change.model";
import {AdminService} from "./admin.service";
import {Auth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut} from "@angular/fire/auth";
import {SocialRegister, SocialRegisterModel} from "../models/socialRegister.model";

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
    this.adminService.decideIfAdmin();
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

  loginWithGoogle(): Observable<AuthResponseModel> {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    return new Observable<AuthResponseModel>(observer => {
      signInWithPopup(this.auth, provider).then(result => {
        const user = result.user;
        const email = user.providerData[0].email;
        this.sendLoginRequest(observer, email);
      }).catch(error => {
        observer.error(error);
        this.auth.signOut();
        localStorage.removeItem('token');
      });
    });
  }

  sendLoginRequest(observer: Subscriber<AuthResponseModel>, email: string) {
    let authRequest = new AuthRequest();
    authRequest.loginEmail = email;
    authRequest.loginPassword = null;
    this.loginUserWithSocialMedia(authRequest).subscribe(response => {
      observer.next(response);
      observer.complete();
    }, error => {
      observer.error(error);
      this.auth.signOut();
      localStorage.removeItem('token');
    });
  }

  private loginUserWithSocialMedia(authRequest: AuthRequest): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(BASE_URL + `/social-authentication`, authRequest);
  }

  registerWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    return new Observable<string>(observer => {
      signInWithPopup(this.auth, provider).then(result => {
        const user = result.user;
        const firstName = user.displayName.split(' ')[0];
        const lastName = user.displayName.split(' ')[1];
        const email = user.providerData[0].email;
        const photoUrl = user.photoURL;
        this.sendRegisterRequest(observer,email, firstName, lastName, photoUrl);
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  sendRegisterRequest(observer:Subscriber<any>, email: string, firstName:string, lastName: string, photoUrl: string) {
    let registerRequest = new SocialRegister();
    registerRequest.email = email;
    registerRequest.firstName = firstName;
    registerRequest.lastName = lastName;
    registerRequest.photoUrl = photoUrl;
    this.registerWithSocial(registerRequest).subscribe(response => {
      observer.next(response);
      observer.complete();
    }, error => {
      observer.error(error);
    });
  }

  private registerWithSocial(registerRequest: SocialRegisterModel) {
    return this.http.post(BASE_URL + `/register-social`,registerRequest);
  }
}
