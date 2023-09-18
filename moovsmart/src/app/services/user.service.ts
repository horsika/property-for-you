import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequestModel} from "../models/register-request.model";
import {AuthRequestModel} from "../models/auth-request-model";
import {AuthResponseModel} from "../models/auth-response.model";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {EmailChangeModel} from "../models/email-change.model";
import {MyAccountModel} from "../models/my-account.model";
import {PasswordChangeModel} from "../models/password-change.model";
import {AdminService} from "./admin.service";

const BASE_URL = environment.BASE_URL + '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenIsPresent = new Subject<boolean>();

  constructor(private http: HttpClient, private adminService: AdminService) { }

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

}
