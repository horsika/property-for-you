import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {MyAccountModel} from "../../models/my-account.model";
import {ChatDetailsModel} from "../../models/chat-details.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IncomingMessageModel} from "../../models/incoming-message.model";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  contacts: MyAccountModel[];
  currentChat: ChatDetailsModel;
  currentContactId: number;
  messageToSend: FormGroup;
  constructor(private chatService: ChatService, private formBuilder: FormBuilder) {
    this.messageToSend = this.formBuilder.group({
      message: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.chatService.getContacts().subscribe(response => {
      this.contacts = response;
    })
  }

  showChat(id: number) {
    this.chatService.getChat(id).subscribe(resp => {
      this.currentChat = resp;
      this.currentContactId = id;
      console.log(this.currentChat);
    })
  }

  sendMsg(id: number) {
    const data: IncomingMessageModel = this.messageToSend.value;
    this.chatService.sendMessage(id, data).subscribe(
      () => {},
      () => {},
      () => {
        this.showChat(id);
        this.messageToSend.reset();
      }
    );
  }





}
