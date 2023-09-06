import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PropertyListItemModel} from "../models/propertyListItem.model";
import {PropertyFormDataModel} from "../models/propertyFormData.model";
import {PropertyDetailsModel} from "../models/propertyDetails.model";
import {environment} from "../../environments/environment";
import {FormOptionsModel} from "../models/form-options.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

   baseUrl = environment.BASE_URL + '/api/properties';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  createProperty(propertyFormData: PropertyFormDataModel): Observable<any> {
    return this.httpClient.post(this.baseUrl, propertyFormData);
  }

  getPropertyList(): Observable<Array<PropertyListItemModel>> {
    return this.httpClient.get<Array<PropertyListItemModel>>(this.baseUrl);
  }

  getPropertyById(id: number) {
    return this.httpClient.get<PropertyDetailsModel>(this.baseUrl + '/' + id);
  }

  getFormOptions() {
    return this.httpClient.get<FormOptionsModel>(this.baseUrl + '/form-options')
  }

  goToPropertyDetails(id:number){
    this.router.navigate(['property-details', id]);
  }
}
