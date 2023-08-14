import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequestModel} from "../models/register-request.model";

const BASE_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(data: RegisterRequestModel) {
    return this.http.post(BASE_URL + '/register', data);
  }
}
