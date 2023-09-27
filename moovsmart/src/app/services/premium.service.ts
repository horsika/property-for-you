import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {PropertyListItemModel} from "../models/propertyListItem.model";
import {NewPropertyFiltersModel} from "../models/new-property-filters.model";

 const baseUrl = environment.BASE_URL + '/api/premium';

@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  viewActiveNewPropertyList(data: NewPropertyFiltersModel): Observable<Array<PropertyListItemModel>> {
    return this.httpClient.post<Array<PropertyListItemModel>>(baseUrl + '/new-properties', data);
  }

}
