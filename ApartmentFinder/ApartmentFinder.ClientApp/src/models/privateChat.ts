import { Message } from "./message";

export interface PrivateChat {
  uniqueName: string;
  partnerId: number;
  advertisementId: number;
  lastMessage: Message;
  hasUnreadMessage: boolean;
}
