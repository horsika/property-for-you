import {MessageDetailsModel} from "./message-details.model";

export interface ChatDetailsModel {
  partnerId: number;
  partnerName: string;
  partnerProfilePic: string;
  ownProfilePic: string;
  messages: MessageDetailsModel[];

}
