import { Box, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { Message } from "../../models/message";

interface IMessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FunctionComponent<IMessageBubbleProps> = ({
  message,
}) => {
  return (
    <>
      <Box>
        <Heading>{message.senderId}</Heading>
        <Text>{message.content}</Text>
      </Box>
    </>
  );
};

export default MessageBubble;
