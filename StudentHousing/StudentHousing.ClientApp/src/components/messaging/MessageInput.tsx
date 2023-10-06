import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { HubConnection } from "@microsoft/signalr";
import * as React from "react";
import { useForm } from "react-hook-form";
import { MessageInputData } from "../../models/forms/messageInputData";
import MessagingService from "../../services/messagingService";
import { useSignalR } from "../../hooks/useSignalR";

interface IMessageInputProps {
  groupName: string;
}
const MessageInput: React.FunctionComponent<IMessageInputProps> = ({
  groupName,
}) => {
  const { handleSubmit, register, reset } = useForm<MessageInputData>();

  const connection = useSignalR();
  const submit = async (data: MessageInputData) => {
    connection &&
      (await MessagingService.sendMessage(data.content, connection, groupName));
    reset();
  };

  return (
    <>
      <Flex
        width="100%"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
        minHeight="80px"
        borderBottomRadius="10px"
      >
        <form onSubmit={handleSubmit(submit)} style={{ width: "100%" }}>
          <HStack width="100%" height="100%" justifyContent="center">
            <Input
              {...register("content", {
                required: true,
              })}
              id="content"
              type="text"
              border="0px"
              autoComplete="off"
              borderRadius="200px"
              backgroundColor="white"
              placeholder="Type your message here..."
              w="70%"
            ></Input>
            <IconButton
              borderRadius="200px"
              aria-label="Send Message"
              size="md"
              type="submit"
              bgColor="brandGreen.500"
              textColor="white"
              _hover={{ background: "brandGreen.700" }}
            >
              <Box className="material-icons" textColor="white">
                send
              </Box>
            </IconButton>
          </HStack>
        </form>
      </Flex>
    </>
  );
};

export default MessageInput;
