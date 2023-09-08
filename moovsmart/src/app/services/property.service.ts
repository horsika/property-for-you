import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {PropertyListItemModel} from "../models/propertyListItem.model";
import {PropertyFormDataModel} from "../models/propertyFormData.model";
import {PropertyDetailsModel} from "../models/propertyDetails.model";
import {environment} from "../../environments/environment";
import {FormOptionsModel} from "../models/form-options.model";
import {Router} from "@angular/router";
import {MyPropertyListItemModel} from "../models/my-property-list-item.model";
import {PropertyActiveToggleModel} from "../models/property-active-toggle.model";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

   baseUrl = environment.BASE_URL + '/api/properties';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  createProperty(propertyFormData: PropertyFormDataModel) {
    return this.httpClient.post(this.baseUrl, propertyFormData);
  }

  getActivatedPropertyList(): Observable<Array<PropertyListItemModel>> {
    return this.httpClient.get<Array<PropertyListItemModel>>(this.baseUrl);
  }

  getPropertyById(id: number) {
    return this.httpClient.get<PropertyDetailsModel>(this.baseUrl + '/' + id);
  }

  getFormOptions() {
    return this.httpClient.get<FormOptionsModel>(this.baseUrl + '/form-options')
  }

  getMyProperties() {
    return this.httpClient.get<Array<MyPropertyListItemModel>>(this.baseUrl + '/my-properties');
  }

  setListingStatus(status: PropertyActiveToggleModel) {
    return this.httpClient.post(this.baseUrl + '/change-active-status', status);
  }

  goToPropertyDetails(id: number) {
    this.router.navigate(['property-details', id]);
  }

  // passing the filtered property list
  commonFilteredPropertiesSubject = new BehaviorSubject<Array<PropertyListItemModel>>([]);
  commonFilteredProperties$: Observable<Array<PropertyListItemModel>> = this.commonFilteredPropertiesSubject.asObservable();
  updateCommonFilteredProperties(properties: Array<PropertyListItemModel>):void{
    this.commonFilteredPropertiesSubject.next(properties);
  }

  saveToFavourites(propertyId: number) {
    return this.httpClient.post(this.baseUrl + '/save-to-favourites', propertyId);
  }
}
