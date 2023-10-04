import { Avatar, Card, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../models/user";
import { UserChatDto } from "../../models/userChatDto";

interface IChatTab {
  chatPartner: User | undefined;
  chat: UserChatDto;
  isSelected?: boolean;
  selectChat: (chatPartner: User, advertisementId: number) => void;
}

const ChatTab: React.FunctionComponent<IChatTab> = ({
  isSelected,
  chatPartner,
  chat,
  selectChat,
}) => {
  return (
    <>
      <Flex
        padding="5px"
        width="100%"
        onClick={() =>
          chatPartner && selectChat(chatPartner, chat.advertisementId)
        }
        flexDirection="row"
        alignItems="center"
        background={isSelected ? "brandGreen.500" : "white"}
        _hover={{ backgroundColor: "gray.100" }}
      >
        <Avatar
          name={`${chatPartner?.firstName} ${chatPartner?.lastName}`}
          size="md"
          textColor={isSelected ? "white" : "black"}
        />
        <Text
          fontSize="1.3rem"
          textColor={isSelected ? "white" : "black"}
          marginLeft="10px"
          fontWeight="semibold"
        >
          {`${chatPartner?.firstName} ${chatPartner?.lastName}`}
        </Text>
      </Flex>
    </>
  );
};

export default ChatTab;
