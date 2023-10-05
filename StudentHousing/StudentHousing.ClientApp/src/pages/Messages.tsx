import * as React from "react";
import { useState, useEffect } from "react";
import MessagingService from "../services/messagingService";
import { Message } from "../models/message";
import { User } from "../models/user";
import { Avatar, Card, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import MessageBubble from "../components/messaging/MessageBubble";
import MessageInput from "../components/messaging/MessageInput";
import UserService from "../services/userService";
import UserChatsSidebar from "../components/messaging/UserChatsSidebar";
import { NAVBAR_HEIGHT } from "../assets/literals/constants";
import RelatedAdvertisementInfo from "../components/messaging/RelatedAdvertisementInfo";
import { useSignalR } from "../hooks/useSignalR";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = ({ user }) => {
  const [groupName, setGroupName] = useState<string>("");
  const [advertisementId, setAdvertisementId] = useState<number | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChatPartner, setSelectedChatPartner] = useState<User>();

  const connection = useSignalR();

  useEffect(() => {
    if (connection && selectedChatPartner && advertisementId) {
      MessagingService.startPrivateChat(
        connection,
        selectedChatPartner.id,
        advertisementId,
      ).then((uniqueName) => {
        setGroupName(uniqueName);
        MessagingService.getMessagesForPrivateChat(uniqueName).then(
          (prevMessages) => {
            setMessages(prevMessages);
          },
        );
      });
    }
  }, [connection, selectedChatPartner, advertisementId]);

  useEffect(() => {
    connection &&
      connection.on("ReceiveMessage", (message: Message) => {
        receiveMessage(message);
      });
  }, [connection]);

  const receiveMessage = (message: Message) => {
    console.log("Received: " + message);
    setMessages((messages) => [...messages, message]);
  };

  const onChatSelected = (chatPartner: User, advertisementId: number) => {
    setSelectedChatPartner(chatPartner);
    setAdvertisementId(advertisementId);
  };

  return (
    <>
      <Flex height={`calc(100vh - ${NAVBAR_HEIGHT})`} justifyContent="center">
        <UserChatsSidebar
          selectChat={onChatSelected}
          width={{ base: "30%", xl: "20%" }}
        />
        {selectedChatPartner ? (
          <Card
            height="100%"
            variant="outline"
            alignItems="center"
            width={{ base: "70%", xl: "55%" }}
            flexDir="column"
          >
            <HStack
              width="100%"
              alignSelf="start"
              height="80px"
              shadow="lg"
              padding="20px"
              backgroundColor="gray.50"
              zIndex="1"
            >
              <Avatar
                name={`${selectedChatPartner.firstName} ${selectedChatPartner.lastName}`}
                size="md"
              />
              <Text
                fontSize="1.6rem"
                marginLeft="10px"
                textColor="gray.600"
                fontWeight="semibold"
              >
                {`${selectedChatPartner.firstName} ${selectedChatPartner.lastName}`}
              </Text>
            </HStack>

            <VStack
              overflowY="scroll"
              width="100%"
              height="100%"
              padding="2rem"
              backgroundColor="gray.50"
            >
              {messages.map((m) => (
                <MessageBubble
                  key={Date.now() * Math.random()}
                  message={m}
                  backgroundColor={
                    m.senderId == UserService.getCurrentUser()?.id
                      ? "brandGreen.500"
                      : "gray.400"
                  }
                  alignment={
                    m.senderId == UserService.getCurrentUser()?.id
                      ? "end"
                      : "start"
                  }
                ></MessageBubble>
              ))}
            </VStack>
            <Flex width="100%">
              <MessageInput groupName={groupName}></MessageInput>
              <></>
            </Flex>
          </Card>
        ) : (
          <Card
            height="100%"
            variant="outline"
            alignItems="center"
            justifyContent="center"
            width={{ base: "70%", xl: "55%" }}
            flexDir="column"
            backgroundColor="gray.50"
          >
            <Text fontSize="1.1rem">Select a chat to show messages</Text>
          </Card>
        )}
        <RelatedAdvertisementInfo
          advertisementId={advertisementId}
          width={{ base: "0%", xl: "25%" }}
        />
      </Flex>
    </>
  );
};

export default Messages;
