import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import MessagingService from "../../services/MessagingService";
import { Message } from "../../models/message";
import { User } from "../../models/user";
import { Flex, VStack } from "@chakra-ui/react";
import MessageBubble from "../messaging/MessageBubble";
import MessageInput from "../messaging/MessageInput";
import UserService from "../../services/UserService";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = (props) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chat, setChat] = useState<Message[]>([
    {
      senderId: 2,
      content: "hehe",
    },
    {
      senderId: 2,
      content: "haha",
    },
  ]);

  useEffect(() => {
    const conn = MessagingService.buildConnection();
    if (conn) {
      setConnection(conn);
    }
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            receiveMessage(message);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const receiveMessage = (message: string) => {
    console.log("Received: " + message);
    const msg: Message = {
      senderId: 1,
      content: message,
    };
    setChat((chat) => [...chat, msg]);
  };

  return (
    <>
      <Flex justifyContent="center" alignItems="center" direction="column">
        <VStack>
          {chat.map((m) => (
            <MessageBubble
              key={Date.now() * Math.random()}
              message={m}
            ></MessageBubble>
          ))}
        </VStack>
        <MessageInput connection={connection}></MessageInput>
      </Flex>
    </>
  );
};

export default Messages;
