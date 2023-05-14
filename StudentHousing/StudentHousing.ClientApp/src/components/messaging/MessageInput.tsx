import { Box, Button, HStack, Textarea } from "@chakra-ui/react";
import { HubConnection } from "@microsoft/signalr";
import * as React from "react";
import { useForm } from "react-hook-form";
import { MessageInputData } from "../../models/formInterfaces/messageInputData";
import MessagingService from "../../services/MessagingService";

interface IMessageInputProps {
  connection: HubConnection | null;
  groupName: string;
}
const MessageInput: React.FunctionComponent<IMessageInputProps> = ({
  connection,
  groupName,
}) => {
  const { handleSubmit, register, reset } = useForm<MessageInputData>();

  const submit = async (data: MessageInputData) => {
    connection &&
      (await MessagingService.sendMessage(data.content, connection, groupName));
    reset();
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
