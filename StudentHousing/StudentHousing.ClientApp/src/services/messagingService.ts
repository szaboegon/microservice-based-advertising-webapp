import {HubConnectionBuilder,} from "@microsoft/signalr";
import {HubConnection, HubConnectionState,} from "@microsoft/signalr/dist/esm/HubConnection";
import InterceptorApiClient from "../helpers/interceptorApiClient";
import TokenHelper from "../helpers/tokenHelper";

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

const apiClient = InterceptorApiClient.createInstance(
  "/api/message",
  {
    "Content-type": "application/json",
  },
);

let connectionInstance: HubConnection | undefined;

const buildConnection = (): HubConnection | undefined => {
  const token = TokenHelper.getLocalAccessToken();
  if (!token) {
    console.log("buildConnnection failed: no token available");
    return;
  }
  if(connectionInstance){
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
  });
  return response.data;
};

const getChatPartnersForUser = async () => {
  const response = await apiClient.get<Array<number>>(`/user_partners`, {
  });
  console.log(response.data);
  return response.data;
};

const getMessagesForPrivateChat = async (uniqueName: string) => {
  const response = await apiClient.get(`/messages/${uniqueName}`, {
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
  );
  return response.data;
};

const markMessagesAsRead = async (connection: HubConnection, groupName: string) =>{
  if (connection.state == HubConnectionState.Connected) {
    try {
      await connection.send("MarkMessagesAsRead", groupName);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("No connection to server yet.");
  }
}

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
