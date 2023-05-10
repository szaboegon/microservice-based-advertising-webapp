import { Box, Button, Textarea } from "@chakra-ui/react";
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
      <Box>
        <form onSubmit={handleSubmit(submit)}>
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
          <Button type="submit">Send</Button>
        </form>
      </Box>
    </>
  );
};

export default MessageInput;
