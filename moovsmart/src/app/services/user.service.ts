import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {RegisterRequestModel} from "../models/register-request.model";
import {AuthRequestModel} from "../models/auth-request-model";
import {AuthResponseModel} from "../models/auth-response.model";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs";

const BASE_URL = environment.BASE_URL + '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  tokenIsPresent = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  registerUser(data: RegisterRequestModel) {
    return this.http.post<AuthResponseModel>(BASE_URL + '/register', data);
  }

  loginUser(data: AuthRequestModel) {
    return this.http.post<AuthResponseModel>(BASE_URL + '/authentication', data);
  }

  removeToken() {
    localStorage.removeItem('token');
    this.tokenIsPresent.next(false);
  }
}
