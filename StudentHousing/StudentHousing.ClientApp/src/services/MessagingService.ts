import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import {
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import { Message } from "../models/message";

const buildConnection = (): HubConnection | undefined => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("buildConnnection failed: no token available");
    return;
  }
  const newConnection = new HubConnectionBuilder()
    .withUrl("/hubs/message", {
      //skipNegotiation: true,
      //transport: HttpTransportType.WebSockets,
      accessTokenFactory: () => JSON.parse(token),
    })
    .withAutomaticReconnect()
    .build();

  return newConnection;
};

const startPrivateChat = async (
  connection: HubConnection,
  otherUserId: number
): Promise<string> => {
  let groupName: string = "";
  try {
    groupName = await connection.invoke("StartPrivateChat", otherUserId);
  } catch (e) {
    console.log(e);
  }
  return groupName;
};

const sendMessage = async (
  message: string,
  connection: HubConnection,
  groupName: string
) => {
  if (connection.state == HubConnectionState.Connected) {
    try {
      await connection.send("SendMessageToGroup", groupName, message);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("No connection to server yet.");
  }
};

const MessagingService = {
  buildConnection,
  startPrivateChat,
  sendMessage,
};

export default MessagingService;
