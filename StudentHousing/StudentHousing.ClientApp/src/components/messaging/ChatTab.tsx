import { Avatar, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../models/user";
import { UserChatDto } from "../../models/userChatDto";
import { useSignalR } from "../../hooks/useSignalR";
import { useEffect, useState } from "react";
import DateHelper from "../../helpers/dateHelper";
import { Message } from "../../models/message";

interface IChatTab {
  chatPartner: User | undefined;
  chat: UserChatDto;
  notifyChatSelected: (chat: UserChatDto, partner: User) => void;
  isSelected: boolean;
}

const ChatTab: React.FunctionComponent<IChatTab> = ({
  chatPartner,
  chat,
  notifyChatSelected,
  isSelected,
}) => {
  const [lastMessage, setLastMessage] = useState<Message>(chat.lastMessage);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(
    chat.hasUnreadMessage,
  );

  const connection = useSignalR();
  const handleClick = () => {
    setHasUnreadMessage(false);
    chatPartner && notifyChatSelected(chat, chatPartner);
  };

  useEffect(() => {
    connection &&
      connection.on("ReceiveMessage", (message: Message) => {
        onMessageReceived(message);
      });
  }, [connection]);

  const onMessageReceived = (message: Message) => {
    if (message.privateChatUniqueName == chat.uniqueName) {
      setLastMessage(message);
      setHasUnreadMessage(!isSelected);
    }
  };

  return (
    <>
      <Flex
        width="96%"
        borderRadius="10px"
        onClick={handleClick}
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
          <HStack width="300px">
            <Text
              maxW="70%"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight={hasUnreadMessage ? "500" : "300"}
            >
              {lastMessage.content}
            </Text>
            <Text>{DateHelper.getFormattedString(lastMessage.timeStamp)}</Text>
          </HStack>
        </VStack>
      </Flex>
    </>
  );
};

export default ChatTab;
