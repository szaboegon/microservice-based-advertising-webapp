import { Box, Button, HStack, Textarea } from "@chakra-ui/react";
import { HubConnection } from "@microsoft/signalr";
import * as React from "react";
import { useForm } from "react-hook-form";
import MessagingService from "../../services/MessagingService";

interface IMessageInputProps {
  connection: HubConnection | null;
  groupName: string;
}

interface MessageInputData {
  content: string;
}

const MessageInput: React.FunctionComponent<IMessageInputProps> = ({
  connection,
  groupName,
}) => {
  const { handleSubmit, register } = useForm<MessageInputData>();

  const submit = (data: MessageInputData) => {
    connection &&
      MessagingService.sendMessage(data.content, connection, groupName);
  };
  return (
    <>
      <Box width="700px">
        <form onSubmit={handleSubmit(submit)}>
          <HStack>
            <Textarea
              {...register("content", {
                required: true,
              })}
              id="content"
              resize="none"
              height="50px"
              size="sm"
              borderColor="brandYellow.800"
            ></Textarea>
            <Button
              size="lg"
              type="submit"
              height="40px"
              bgColor="brandGreen.500"
              textColor="white"
              _hover={{ background: "brandGreen.700" }}
            >
              Send
            </Button>
          </HStack>
        </form>
      </Box>
    </>
  );
};

export default MessageInput;
