import * as React from "react";
import { useState, useEffect } from "react";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import MessagingService from "../../services/MessagingService";
import { Message } from "../../models/message";
import { User } from "../../models/user";
import { Flex, VStack } from "@chakra-ui/react";
import MessageBubble from "../messaging/MessageBubble";
import MessageInput from "../messaging/MessageInput";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = (props) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [chat, setChat] = useState<Message[]>([]);

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
        .then(async (result) => {
          const uniqueName = await MessagingService.startPrivateChat(
            connection,
            2
          );
          setGroupName(uniqueName);
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
        <MessageInput
          connection={connection}
          groupName={groupName}
        ></MessageInput>
      </Flex>
    </>
  );
};

export default Messages;
