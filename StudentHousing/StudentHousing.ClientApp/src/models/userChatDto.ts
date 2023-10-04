import { Message } from "./message";

export interface UserChatDto {
  uniqueName: string;
  partnerId: number;
  advertisementId: number;
  lastMessage: Message;
  hasUnreadMessage: boolean;
}
