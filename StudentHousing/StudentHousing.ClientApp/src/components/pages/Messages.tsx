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
import MessageBubble from "../messages/MessageBubble";
import MessageInput from "../messages/MessageInput";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = (props) => {
  const [connection, setConnection] = useState<HubConnection>();
  const [chat, setChat] = useState<Message[]>([]);
  const latestChat = useRef<Message[]>([]);

  latestChat.current = chat;

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
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

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
