import {
  DefaultHttpClient,
  HttpTransportType,
  HubConnectionBuilder,
} from "@microsoft/signalr";
import {
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import axios from "axios";
import authHeader from "./auth/authHeader";

/*const getAuthHeaders = () => ({
  Authorization: "Bearer " + localStorage.getItem("token") ?? "",
});

class CustomHttpClient extends DefaultHttpClient {
  constructor() {
    super(console);
  }

  public async send(
    request: signalR.HttpRequest
  ): Promise<signalR.HttpResponse> {
    var authHeaders = authHeader();
    request.headers = { ...request.headers, ...authHeaders };
    return super.send(request);
  }
}*/

const apiClient = axios.create({
  baseURL: "/api/message",
  headers: {
    "Content-type": "application/json",
  },
});

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
      //httpClient: new CustomHttpClient(),
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
  messageContent: string,
  connection: HubConnection,
  groupName: string
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

const getPrivateChatsForUser = async () => {
  const response = await apiClient.get(`/user_chats`, {
    headers: authHeader(),
  });
  return response.data;
};

const getChatPartnersForUser = async () => {
  const response = await apiClient.get<Array<number>>(`/user_partners`, {
    headers: authHeader(),
  });
  console.log(response.data);
  return response.data;
};

const getMessagesForPrivateChat = async (uniqueName: string) => {
  const response = await apiClient.get(`/messages/${uniqueName}`, {
    headers: authHeader(),
  });
  return response.data;
};

const sendMessageToAdvertiser = async (
  receiverId: number,
  messageContent: string
) => {
  const response = await apiClient.post(
    `/send_message/${receiverId}`,
    messageContent,
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

const MessagingService = {
  buildConnection,
  startPrivateChat,
  sendMessage,
  sendMessageToAdvertiser,
  getPrivateChatsForUser,
  getChatPartnersForUser,
  getMessagesForPrivateChat,
};

export default MessagingService;
