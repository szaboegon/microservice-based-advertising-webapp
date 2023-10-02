import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import InterceptorApiClient from "../helpers/interceptorApiClient";
import TokenHelper from "../helpers/tokenHelper";
import { SendMessageRequest } from "../models/requests/sendMessageRequest";
import { UserChatDto } from "../models/userChatDto";

const apiClient = InterceptorApiClient.createInstance("/api/message", {
  "Content-type": "application/json",
});

let connectionInstance: HubConnection | undefined;

const buildConnection = (): HubConnection | undefined => {
  const token = TokenHelper.getLocalAccessToken();
  if (!token) {
    console.log("buildConnnection failed: no token available");
    return;
  }
  if (connectionInstance) {
    return connectionInstance;
  }
  connectionInstance = new HubConnectionBuilder()
    .withUrl("/hubs/message", {
      //skipNegotiation: true,
      //transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => JSON.parse(token),
      //httpClient: new CustomHttpClient(),
    })
    .withAutomaticReconnect()
    .build();

  return connectionInstance;
};

const startConnection = async (connection: HubConnection) => {
  if (
    connection.state != HubConnectionState.Connected &&
    connection.state != HubConnectionState.Connecting &&
    connection.state != HubConnectionState.Reconnecting
  ) {
    await connection.start();
  }
  return connection;
};

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

const getPrivateChatsForUser = async (): Promise<UserChatDto> => {
  const response = await apiClient.get(`/user_chats`, {});
  return response.data;
};

/*const getChatPartnersForUser = async () => {
  const response = await apiClient.get<Array<number>>(`/user_partners`, {});
  console.log(response.data);
  return response.data;
};*/

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
  return await apiClient("/unread_message_count").then((response) => {
    return response.data;
  });
};

const MessagingService = {
  buildConnection,
  startConnection,
  startPrivateChat,
  sendMessage,
  sendMessageToAdvertiser,
  getPrivateChatsForUser,
  getMessagesForPrivateChat,
  markMessagesAsRead,
  getUnreadMessageCount,
};

export default MessagingService;
