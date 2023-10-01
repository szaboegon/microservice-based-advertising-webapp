import { Avatar, Card, Flex, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../models/user";
import { NAVBAR_HEIGHT } from "../../assets/literals/constants";

interface IChatTab {
  chatPartner: User;
  setSelectedChatPartner: React.Dispatch<
    React.SetStateAction<User | undefined>
  >;
  isSelected?: boolean;
}

const ChatTab: React.FunctionComponent<IChatTab> = ({
  isSelected,
  chatPartner,
  setSelectedChatPartner,
}) => {
  return (
    <>
      <Flex
        padding="5px"
        width="100%"
        onClick={() => setSelectedChatPartner(chatPartner)}
        flexDirection="row"
        alignItems="center"
        background={isSelected ? "brandGreen.500" : "white"}
        _hover={{ backgroundColor: "gray.100" }}
      >
        <Avatar
          name={`${chatPartner.firstName} ${chatPartner.lastName}`}
          size="md"
          textColor={isSelected ? "white" : "black"}
        />
        <Text
          fontSize="1.3rem"
          textColor={isSelected ? "white" : "black"}
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
