import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  HubConnection,
  HubConnectionState,
} from "@microsoft/signalr/dist/esm/HubConnection";
import MessagingService from "../../services/MessagingService";
import { Message } from "../../models/message";
import { User } from "../../models/user";
import { Flex } from "@chakra-ui/react";
import MessageBubble from "../messaging/MessageBubble";
import MessageInput from "../messaging/MessageInput";
import UserService from "../../services/UserService";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = (props) => {
  const [connection, setConnection] = useState<HubConnection>();
  const [chat, setChat] = useState<Message[]>([]);

  useEffect(() => {
    const conn = MessagingService.buildConnection();
    setConnection(conn);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (message) => {
            console.log(message);
            const msg: Message = {
              senderId: 1,
              content: message,
            };
            const updatedChat = [...chat];
            updatedChat.push(msg);

            setChat(updatedChat);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  return (
    <>
      <Flex justifyContent="center" alignItems="center">
        {chat.map((m) => (
          <MessageBubble
            key={Date.now() * Math.random()}
            message={m}
          ></MessageBubble>
        ))}
        <MessageInput connection={connection}></MessageInput>
      </Flex>
    </>
  );
};

export default Messages;
