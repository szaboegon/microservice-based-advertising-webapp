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
import { UserChatDto } from "../models/userChatDto";
import { useQuery } from "react-query";
import AdvertisementService from "../services/advertisementService";
import { PagedQueryResponse } from "../models/pagedQueryResponse";
import { AdvertisementCardDto } from "../models/advertisement/advertisementCardDto";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<UserChatDto>();
  const [partner, setPartner] = useState<User>();

  const connection = useSignalR();

  useEffect(() => {
    if (connection && selectedChat && partner) {
      MessagingService.startPrivateChat(
        connection,
        partner.id,
        selectedChat.advertisementId,
      );
    }
  }, [connection, selectedChat, partner]);

  useQuery({
    queryKey: ["prevMessages", selectedChat],
    queryFn: async () => {
      return await MessagingService.getMessagesForPrivateChat(
        selectedChat?.uniqueName!,
      );
    },
    onSuccess: (prevMessages) => {
      setMessages(prevMessages);
    },
    enabled: !!selectedChat?.uniqueName,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    connection &&
      connection.on("ReceiveMessage", (message: Message) => {
        onMessageReceived(message);
      });
  }, [connection]);

  const onMessageReceived = (message: Message) => {
    setMessages((messages) => [...messages, message]);
  };

  const onChatSelected = (chat: UserChatDto, partner: User) => {
    setSelectedChat(chat);
    setPartner(partner);
  };

  return (
    <>
      <Flex
        height={`calc(100vh - ${NAVBAR_HEIGHT})`}
        justifyContent="center"
        flexDirection="row"
      >
        <UserChatsSidebar
          notifyChatSelected={onChatSelected}
          flex="0 0 340px"
        />
        {partner && selectedChat ? (
          <Card
            height="100%"
            variant="outline"
            alignItems="center"
            flex="1 0"
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
                name={`${partner.firstName} ${partner.lastName}`}
                size="md"
              />
              <Text
                fontSize="1.6rem"
                marginLeft="10px"
                textColor="gray.600"
                fontWeight="semibold"
              >
                {`${partner.firstName} ${partner.lastName}`}
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
              <MessageInput groupName={selectedChat.uniqueName}></MessageInput>
              <></>
            </Flex>
          </Card>
        ) : (
          <Card
            height="100%"
            variant="outline"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            flex="1 0"
            backgroundColor="gray.50"
          >
            <Text fontSize="1.1rem">Select a chat to show messages</Text>
          </Card>
        )}
        <RelatedAdvertisementInfo
          advertisementId={selectedChat?.advertisementId}
          flex="0 0 450px"
        />
      </Flex>
    </>
  );
};

export default Messages;
