import * as React from "react";
import { useState, useEffect } from "react";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import MessagingService from "../../services/MessagingService";
import { Message } from "../../models/message";
import { User } from "../../models/user";
import { Avatar, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import MessageBubble from "../messaging/MessageBubble";
import MessageInput from "../messaging/MessageInput";
import ChatTab from "../messaging/ChatTab";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = ({ user }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [chatPartners, setChatPartners] = useState<User[]>([
    {
      id: 1,
      userName: "user1",
      firstName: "Jozsef",
      lastName: "Nagy",
      email: "jozsef@gmail.com",
    },
    {
      id: 2,
      userName: "user2",
      firstName: "Janos",
      lastName: "Kis",
      email: "janos@gmail.com",
    },
  ]);
  const [selectedChatPartner, setSelectedChatPartner] = useState<User>();

  useEffect(() => {
    const conn = MessagingService.buildConnection();
    if (conn) {
      setConnection(conn);
    }
  }, [selectedChatPartner]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(async (result) => {
          if (!selectedChatPartner) return;
          const uniqueName = await MessagingService.startPrivateChat(
            connection,
            selectedChatPartner.id
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
      senderId: selectedChatPartner?.id,
      content: message,
    };
    setMessages((messages) => [...messages, msg]);
  };

  return (
    <>
      <Flex>
        <VStack
          flex="20%"
          borderColor="brandGreen.500"
          borderWidth="medium"
          backgroundColor="brandGreen.300"
          height={"calc(100vh - 80px)"}
          alignItems="start"
          minWidth="300px"
        >
          <Heading
            fontSize="1.8rem"
            color="white"
            marginY="15px"
            marginLeft="5px"
          >
            Private Chats
          </Heading>
          {chatPartners.map((partner) => (
            <ChatTab
              chatPartner={partner}
              setSelectedChatPartner={setSelectedChatPartner}
            />
          ))}
        </VStack>
        <VStack
          flex="80%"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          {selectedChatPartner ? (
            <HStack
              backgroundColor="brandGreen.300"
              width="100%"
              alignSelf="start"
              borderBottom="0"
              borderLeft="0"
              borderColor="brandGreen.500"
              borderWidth="medium"
              height="70px"
            >
              <Avatar
                name={`${selectedChatPartner.firstName} ${selectedChatPartner.lastName}`}
                size="md"
              />
              <Text
                fontSize="1.6rem"
                textColor="white"
                marginLeft="10px"
                fontWeight="semibold"
              >
                {`${selectedChatPartner.firstName} ${selectedChatPartner.lastName}`}
              </Text>
            </HStack>
          ) : (
            <></>
          )}
          {messages.map((m) => (
            <MessageBubble
              key={Date.now() * Math.random()}
              message={m}
            ></MessageBubble>
          ))}
          <Flex position="fixed" bottom="20px">
            <MessageInput
              connection={connection}
              groupName={groupName}
            ></MessageInput>
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

export default Messages;
