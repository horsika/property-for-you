import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MyAccountModel} from "../models/my-account.model";
import {ChatDetailsModel} from "../models/chat-details.model";
import {IncomingMessageModel} from "../models/incoming-message.model";

const BASE_URL = environment.BASE_URL + '/api/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get<Array<MyAccountModel>>(BASE_URL + "/contacts")
  }

  getChat(id: number, offset: number) {
    return this.http.get<ChatDetailsModel>(BASE_URL + "/" + id + "/" + offset);
  }

  sendMessage(id: number, msg: IncomingMessageModel) {
    return this.http.post(BASE_URL + "/" + id, msg);
  }

}
