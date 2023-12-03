import React, { createContext, useContext, useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import { useAccessToken } from "./useAccessToken";
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
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
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

    conn.onclose((error) => {
      setTimeout(() => {
        conn.start().then(() => {
          setConnection(conn);
        });
      }, 3000);
    });
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
