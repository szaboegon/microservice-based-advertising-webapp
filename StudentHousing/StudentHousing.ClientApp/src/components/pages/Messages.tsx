import * as React from "react";
import { useState, useEffect } from "react";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";
import MessagingService from "../../services/MessagingService";
import { Message } from "../../models/message";
import { User } from "../../models/user";
import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import MessageBubble from "../messaging/MessageBubble";
import MessageInput from "../messaging/MessageInput";
import ChatTab from "../messaging/ChatTab";
import UserService from "../../services/UserService";
import { useQuery } from "react-query";
import { WarningAlert } from "../alerts/WarningAlert";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { AxiosError } from "axios";

interface IMessagesProps {
  user: User;
}

const Messages: React.FunctionComponent<IMessagesProps> = ({ user }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const [chatPartnerIds, setChatPartnerIds] = useState<number[] | undefined>(
    undefined
  );
  const [chatPartners, setChatPartners] = useState<User[]>([]);
  const [selectedChatPartner, setSelectedChatPartner] = useState<User>();

  const {
    isSuccess: isSuccessPartnerIds,
    isLoading: isLoadingPartnerIds,
    isError: isErrorPartnerIds,
    isRefetching: isRefetchingPartnerIds,
    error: errorPartnerIds,
  } = useQuery({
    queryKey: ["partnerIds"],
    queryFn: async () => {
      return await MessagingService.getChatPartnersForUser();
    },
    onSuccess: (data: number[]) => setChatPartnerIds(data),
    refetchOnWindowFocus: false,
  });

  const {
    isSuccess: isSuccessPartnerData,
    isLoading: isLoadingPartnerData,
    isError: isErrorPartnerData,
    isRefetching: isRefetchingPartnerData,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      chatPartnerIds?.forEach((id) => {
        queryParams.append("id", id.toString());
      });
      return await UserService.getUserDetails(queryParams);
    },
    onSuccess: (data: User[]) => setChatPartners(data),
    refetchOnWindowFocus: false,
    enabled: !!chatPartnerIds,
  });

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
          <Flex justifyContent="center" alignItems="center" width="100%">
            {isSuccessPartnerData &&
              chatPartners.map((partner) => (
                <ChatTab
                  key={partner.id}
                  chatPartner={partner}
                  setSelectedChatPartner={setSelectedChatPartner}
                />
              ))}
            {(isLoadingPartnerIds ||
              isRefetchingPartnerIds ||
              isLoadingPartnerData ||
              isRefetchingPartnerData) &&
              chatPartners.length <= 0 && <Spinner />}

            {(isErrorPartnerIds || isErrorPartnerData) &&
              !isLoadingPartnerIds &&
              !isRefetchingPartnerIds &&
              errorPartnerIds instanceof AxiosError && (
                <ErrorAlert error={errorPartnerIds} />
              )}

            {isSuccessPartnerData &&
              isSuccessPartnerIds &&
              chatPartners.length <= 0 &&
              !isRefetchingPartnerIds &&
              !isRefetchingPartnerData && (
                <WarningAlert message="You have no private chats yet." />
              )}
          </Flex>
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
