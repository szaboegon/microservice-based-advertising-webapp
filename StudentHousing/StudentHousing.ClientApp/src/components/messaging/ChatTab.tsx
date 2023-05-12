import { Avatar, Card, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../models/user";

interface IChatTab {
  chatPartner: User;
  setSelectedChatPartner: React.Dispatch<
    React.SetStateAction<User | undefined>
  >;
}

const ChatTab: React.FunctionComponent<IChatTab> = ({
  chatPartner,
  setSelectedChatPartner,
}) => {
  return (
    <>
      <Flex
        className="chat-tab-container"
        align="start"
        padding="2%"
        width="100%"
        direction="row"
        alignItems="center"
        backgroundColor="gray.200"
        _hover={{
          backgroundColor: "white",
        }}
        onClick={() => setSelectedChatPartner(chatPartner)}
      >
        <Avatar
          name={`${chatPartner.firstName} ${chatPartner.lastName}`}
          size="md"
        />
        <Text
          fontSize="1.4rem"
          textColor="gray.500"
          marginLeft="10px"
          fontWeight="semibold"
        >
          {`${chatPartner.firstName} ${chatPartner.lastName}`}
        </Text>
      </Flex>
    </>
  );
};

export default ChatTab;
