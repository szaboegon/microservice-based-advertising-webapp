import { Box, Text } from "@chakra-ui/react";
import * as React from "react";
import { Message } from "../../models/message";

interface IMessageBubbleProps {
  message: Message;
  backgroundColor: string;
  alignment: string;
}

const MessageBubble: React.FunctionComponent<IMessageBubbleProps> = ({
  message,
  backgroundColor,
  alignment,
}) => {
  return (
    <>
      <Box
        backgroundColor={backgroundColor}
        alignSelf={alignment}
        borderRadius="20"
        padding="0.5rem"
      >
        <Text textColor="white" maxWidth="500px" whiteSpace="pre-wrap">
          {message.content}
        </Text>
      </Box>
    </>
  );
};

export default MessageBubble;
