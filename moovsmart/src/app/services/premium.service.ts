import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MyAccountModel} from "../models/my-account.model";
import {BehaviorSubject, Subject} from "rxjs";
import {environment} from "../../environments/environment";

const BASE_URL = environment.BASE_URL + '/api/premium';
@Injectable({
  providedIn: 'root'
})
export class PremiumService {

  newChatRecipient = new BehaviorSubject<MyAccountModel>(null);

  constructor(private http: HttpClient) { }

  getPropertyOwnerAkaRecipient(propertyId: number) {
    return this.http.get<MyAccountModel>(BASE_URL + '/' + propertyId);
  }



}
