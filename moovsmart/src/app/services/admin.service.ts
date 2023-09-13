import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {MyAccountModel} from "../models/my-account.model";
import {MyPropertyListItemModel} from "../models/my-property-list-item.model";
import {AdminPropertyFiltersModel} from "../models/admin-property-filters.model";
import {UserActiveStatusModel} from "../models/user-active-status.model";


const BASE_URL = environment.BASE_URL + '/api/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isAdmin = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

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

  getAllProperties(data: AdminPropertyFiltersModel) {
    return this.http.post<MyPropertyListItemModel[]>(BASE_URL + '/all-properties', data);
  }

  changeUserStatus(data: UserActiveStatusModel) {
    return this.http.post(BASE_URL + '/change-user-status', data);
  }

}
