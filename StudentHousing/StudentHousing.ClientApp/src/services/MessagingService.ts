import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import {
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";

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
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  return newConnection;
};

const sendMessage = async (message: string, connection: HubConnection) => {
  const chatMessage = {};

  if (connection.state == HubConnectionState.Connected) {
    try {
      await connection.send("SendMessage", "test");
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("No connection to server yet.");
  }
};

const MessagingService = {
  buildConnection,
  sendMessage,
};

export default MessagingService;
