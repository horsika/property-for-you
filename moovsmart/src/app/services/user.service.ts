import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequestModel} from "../models/register-request.model";
import {AuthRequestModel} from "../models/auth-request-model";
import {AuthResponseModel} from "../models/auth-response.model";

const BASE_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(data: RegisterRequestModel) {
    return this.http.post<AuthResponseModel>(BASE_URL + '/register', data);
  }

  loginUser(data: AuthRequestModel) {
    return this.http.post<AuthResponseModel>(BASE_URL + '/authentication', data)
  }
}
