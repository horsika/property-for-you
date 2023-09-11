import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {MyAccountModel} from "../models/my-account.model";
import {MyPropertyListItemModel} from "../models/my-property-list-item.model";


  const BASE_URL = environment.BASE_URL + '/api/admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isAdmin = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<MyAccountModel[]>(BASE_URL + '/all-users');
  }

  getEnabledUsers() {
    return this.http.get<MyAccountModel[]>(BASE_URL + '/enabled-users');
  }

  getDisabledUsers() {
    return this.http.get<MyAccountModel[]>(BASE_URL + '/disabled-users');
  }

  getUsersOwnedProperties(id: number) {
    return this.http.get<MyPropertyListItemModel[]>(BASE_URL + '/created-properties/' + id);
  }

  getAllProperties() {
    return this.http.get<MyPropertyListItemModel[]>(BASE_URL + '/all-properties');
  }

}
