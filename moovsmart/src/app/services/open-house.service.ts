import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OpenHouseFormDataModel} from "../models/open-house-form-data.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {OpenHouseListItemModel} from "../models/open-house-list-item.model";
import {MyOpenHouseListItemModel} from "../models/my-open-house-list-item.model";
import {MyBookingListItemModel} from "../models/my-booking-list-item.model";

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

  getMyOpenHouseList(): Observable<Array<MyOpenHouseListItemModel>>{
    return this.http.get<Array<MyOpenHouseListItemModel>>(BASE_URL+ '/my-openhouses');
  }

  getMyBookingList(): Observable<Array<MyBookingListItemModel>>{
    return this.http.get<Array<MyBookingListItemModel>>(BASE_URL+ '/my-bookings');
  }

  //navigating to my-page, activePage
  private selectedPropertyIdSubject = new BehaviorSubject<number | null>(null);
  selectedPropertyId$ = this.selectedPropertyIdSubject.asObservable();

  setSelectedPropertyId(propertyId: number) {
    this.selectedPropertyIdSubject.next(propertyId);
  }



}
