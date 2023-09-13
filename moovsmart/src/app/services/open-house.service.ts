import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OpenHouseFormDataModel} from "../models/open-house-form-data.model";

const BASE_URL = environment.BASE_URL + '/api/openhouses';
@Injectable({
  providedIn: 'root'
})
export class OpenHouseService {

  constructor(private http: HttpClient) { }

  createOpenHouse(data: OpenHouseFormDataModel) {
    return this.http.post(BASE_URL, data);
  }


}
