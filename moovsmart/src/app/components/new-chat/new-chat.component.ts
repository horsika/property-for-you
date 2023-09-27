import {Component, OnInit} from '@angular/core';
import {ChatDetailsModel} from "../../models/chat-details.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../services/chat.service";
import {IncomingMessageModel} from "../../models/incoming-message.model";
import {PremiumService} from "../../services/premium.service";
import {MyAccountModel} from "../../models/my-account.model";

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit{
  chat: ChatDetailsModel;
  contactId: number;
  recipient: MyAccountModel;
  messageToSend: FormGroup;

  constructor(private chatService: ChatService,
              private formBuilder: FormBuilder,
              private premiumService: PremiumService) {
    this.messageToSend = this.formBuilder.group({
      message: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.premiumService.newChatRecipient.subscribe(value => {
      this.recipient = value;
      this.contactId = value.id;
    })
    this.showChat(this.contactId);
  }


  showChat(id: number) {
    this.chatService.getChat(id, 0).subscribe(resp => { // magic number, change!!
      this.chat = resp;
      this.contactId = id;
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
