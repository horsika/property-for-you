import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BookingFormDataModel} from "../models/booking-form-data.model";

const BASE_URL = environment.BASE_URL + '/api/bookings';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  createBooking(data: BookingFormDataModel) {
    return this.http.post(BASE_URL, data);
  }


}
