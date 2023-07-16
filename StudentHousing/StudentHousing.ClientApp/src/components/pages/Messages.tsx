import * as React from "react";
import { useState, useEffect } from "react";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import MessagingService from "../../services/MessagingService";
import { Message } from "../../models/message";
import { User } from "../../models/user";
import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import MessageBubble from "../messaging/MessageBubble";
import MessageInput from "../messaging/MessageInput";
import UserService from "../../services/UserService";
import PartnersSidebar from "../messaging/PartnersSidebar";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = ({ user }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [selectedChatPartner, setSelectedChatPartner] = useState<User>();
  useEffect(() => {
    if (!selectedChatPartner) return;
    const conn = MessagingService.buildConnection();
    if (conn) {
      setConnection(conn);
    }
  }, [selectedChatPartner]);

  useEffect(() => {
    if (!selectedChatPartner) return;
    if (connection) {
      connection
        .start()
        .then(async (result) => {
          const uniqueName = await MessagingService.startPrivateChat(
            connection,
            selectedChatPartner.id
          );
          setGroupName(uniqueName);
          console.log("Name " + uniqueName);
          const previousMessages =
            await MessagingService.getMessagesForPrivateChat(uniqueName);
          setMessages(previousMessages);
          console.log("Connected!");
          connection.on("ReceiveMessage", (message: Message) => {
            receiveMessage(message);
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  const receiveMessage = (message: Message) => {
    console.log("Received: " + message);
    setMessages((messages) => [...messages, message]);
  };

  return (
    <>
      <Flex>
        <PartnersSidebar setSelectedChatPartner={setSelectedChatPartner} />
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
          <VStack
            overflowY="scroll"
            height={"calc(100vh - 260px)"}
            width="100%"
            paddingX="2rem"
          >
            {messages.map((m) => (
              <MessageBubble
                key={Date.now() * Math.random()}
                message={m}
                backgroundColor={
                  m.senderId == UserService.getCurrentUser()?.id
                    ? "brandGreen.500"
                    : "brandYellow.500"
                }
                alignment={
                  m.senderId == UserService.getCurrentUser()?.id
                    ? "end"
                    : "start"
                }
              ></MessageBubble>
            ))}
          </VStack>
          <Flex position="fixed" bottom="20px">
            {connection ? (
              <MessageInput
                connection={connection}
                groupName={groupName}
              ></MessageInput>
            ) : (
              <></>
            )}
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

export default Messages;
