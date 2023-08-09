import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserFormModel} from "../models/user-form.model";

const BASE_URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(data: UserFormModel) {
    return this.http.post(BASE_URL + '/register', data);
  }
}
