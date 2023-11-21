import { HubConnectionState } from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import InterceptorApiClient from "../helpers/interceptorApiClient";
import { SendMessageRequest } from "../models/requests/sendMessageRequest";
import { PrivateChat } from "../models/privateChat";

const apiClient = InterceptorApiClient.createInstance("/api/message", {
  "Content-type": "application/json",
});
const startPrivateChat = async (
  connection: HubConnection,
  otherUserId: number,
  advertisementId: number,
): Promise<string> => {
  let groupName: string = "";
  try {
    groupName = await connection.invoke(
      "StartPrivateChat",
      otherUserId,
      advertisementId,
    );
  } catch (e) {
    console.log(e);
  }
  return groupName;
};

const sendMessage = async (
  messageContent: string,
  connection: HubConnection,
  groupName: string,
) => {
  if (connection.state == HubConnectionState.Connected) {
    try {
      await connection.send("SendMessageToGroup", groupName, messageContent);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("No connection to server yet.");
  }
};

const getPrivateChatsForUser = async (): Promise<PrivateChat> => {
  const response = await apiClient.get(`/user_chats`, {});
  return response.data;
};

const getMessagesForPrivateChat = async (uniqueName: string) => {
  const response = await apiClient.get(`/messages/${uniqueName}`, {});
  return response.data;
};

const sendMessageToAdvertiser = async (
  receiverId: number,
  advertisementId: number,
  messageContent: string,
) => {
  const requestData: SendMessageRequest = {
    messageContent: messageContent,
    advertisementId: advertisementId,
    receiverId: receiverId,
  };
  const response = await apiClient.post("/send_message", requestData);
  return response.data;
};

const markMessagesAsRead = async (
  connection: HubConnection,
  groupName: string,
) => {
  if (connection.state == HubConnectionState.Connected) {
    try {
      await connection.send("MarkMessagesAsRead", groupName);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("No connection to server yet.");
  }
};

const getUnreadMessageCount = async (): Promise<number> => {
  const response = await apiClient("/unread_message_count");
  return response.data;
};

const MessagingService = {
  startPrivateChat,
  sendMessage,
  sendMessageToAdvertiser,
  getPrivateChatsForUser,
  getMessagesForPrivateChat,
  markMessagesAsRead,
  getUnreadMessageCount,
};

export default MessagingService;
