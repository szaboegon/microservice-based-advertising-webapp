import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../models/user";
import { PrivateChat } from "../../models/privateChat";
import { useSignalR } from "../../hooks/useSignalR";
import { useEffect, useState } from "react";
import DateHelper from "../../helpers/dateHelper";
import { Message } from "../../models/message";
import MessagingService from "../../services/messagingService";
import UserService from "../../services/userService";

interface IChatTab {
  chatPartner: User | undefined;
  chat: PrivateChat;
  handleClick: (chat: PrivateChat, partner: User) => void;
  isSelected: boolean;
}

const ChatTab: React.FunctionComponent<IChatTab> = ({
  chatPartner,
  chat,
  handleClick,
  isSelected,
}) => {
  const [lastMessage, setLastMessage] = useState<Message>(chat.lastMessage);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(
    chat.hasUnreadMessage,
  );
  const connection = useSignalR();

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (message: Message) => {
        onMessageReceived(message);
      });
    }
  }, [connection]);

  const onMessageReceived = (message: Message) => {
    if (message.privateChatUniqueName == chat.uniqueName) {
      setLastMessage(message);
      if (message.senderId != UserService.getCurrentUser()?.id) {
        setHasUnreadMessage(true);
      }
    }
  };

  useEffect(() => {
    if (isSelected && hasUnreadMessage) {
      setHasUnreadMessage(false);
      connection &&
        MessagingService.markMessagesAsRead(connection, chat.uniqueName);
    }
  }, [isSelected, hasUnreadMessage]);

  return (
    <>
      <Flex
        width="96%"
        borderRadius="10px"
        onClick={() => {
          chatPartner && handleClick(chat, chatPartner);
        }}
        background={isSelected ? "brandGreen.500" : "white"}
        alignItems="center"
        _hover={
          isSelected
            ? { backgroundColor: "brandGreen.500" }
            : { backgroundColor: "gray.200" }
        }
        paddingX="5px"
        paddingY="2px"
        margin="2px"
      >
        <Avatar
          name={`${chatPartner?.firstName} ${chatPartner?.lastName}`}
          size="md"
          textColor={isSelected ? "white" : "black"}
        />
        <VStack
          justifyContent="start"
          alignItems="start"
          marginLeft="10px"
          gap="0"
          width="300px"
          paddingRight="20px"
          textColor={isSelected ? "white" : "black"}
        >
          <Text
            fontSize="1.1rem"
            fontWeight="semibold"
            w="80%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {`${chatPartner?.firstName} ${chatPartner?.lastName}`}
          </Text>
          <HStack width="300px" fontWeight={hasUnreadMessage ? "500" : "400"}>
            <Text
              maxW="70%"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {lastMessage.senderId == chatPartner?.id
                ? `${lastMessage.content}`
                : `You: ${lastMessage.content}`}
            </Text>
            <Text>{DateHelper.getFormattedString(lastMessage.timeStamp)}</Text>
          </HStack>
        </VStack>
      </Flex>
    </>
  );
};

export default ChatTab;
