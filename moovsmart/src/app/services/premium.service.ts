import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyAccountModel} from "../models/my-account.model";
import {BehaviorSubject, Subject} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PropertyListItemModel} from "../models/propertyListItem.model";
import {NewPropertyFiltersModel} from "../models/new-property-filters.model";

 const baseUrl = environment.BASE_URL + '/api/premium';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  newChatRecipient = new BehaviorSubject<MyAccountModel>(null);

  constructor(private http: HttpClient,
              private router: Router) { }

  getPropertyOwnerAkaRecipient(propertyId: number) {
    return this.http.get<MyAccountModel>(baseUrl + '/' + propertyId);
  }

  viewActiveNewPropertyList(data: NewPropertyFiltersModel): Observable<Array<PropertyListItemModel>> {
    return this.http.post<Array<PropertyListItemModel>>(baseUrl + '/new-properties', data);
  }



}
