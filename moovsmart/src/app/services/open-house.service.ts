import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OpenHouseFormDataModel} from "../models/open-house-form-data.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {OpenHouseListItemModel} from "../models/open-house-list-item.model";

const BASE_URL = environment.BASE_URL + '/api/openhouses';
@Injectable({
  providedIn: 'root'
})
export class OpenHouseService {

  private activePageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  createOpenHouse(data: OpenHouseFormDataModel) {
    return this.http.post(BASE_URL, data);
  }

  getActiveOpenHouseListGroupedByPropertyId(): Observable<Array<OpenHouseListItemModel>>{
    return this.http.get<Array<OpenHouseListItemModel>>(BASE_URL);
  }


  //navigating to my-page, activePage
  private selectedPropertyIdSubject = new BehaviorSubject<number | null>(null);
  selectedPropertyId$ = this.selectedPropertyIdSubject.asObservable();

  setSelectedPropertyId(propertyId: number) {
    console.log(propertyId);
    this.selectedPropertyIdSubject.next(propertyId);
  }



}
