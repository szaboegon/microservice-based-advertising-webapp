import React, { createContext, useContext, useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import useAccessToken from "./useAccessToken";
import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";

interface ISignalRProvider {
  children: any;
}

type SignalRContextType = {
  connection: HubConnection | undefined;
};

const SignalRContext = createContext<SignalRContextType>({
  connection: undefined,
});
export const SignalRProvider: React.FunctionComponent<ISignalRProvider> = ({
  children,
}) => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
  const { accessToken, setAccessToken } = useAccessToken();

  useEffect(() => {
    console.log("newConn");
    if (!accessToken) {
      return;
    }
    console.log("newConn");
    const conn = new HubConnectionBuilder()
      .withUrl("/hubs/message", {
        accessTokenFactory: () => accessToken,
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    if (conn.state === HubConnectionState.Disconnected) {
      conn.start().then(() => {
        setConnection(conn);
      });
    }
  }, [accessToken]);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
};

export function useSignalR() {
  const context = useContext(SignalRContext);
  return context.connection;
}
