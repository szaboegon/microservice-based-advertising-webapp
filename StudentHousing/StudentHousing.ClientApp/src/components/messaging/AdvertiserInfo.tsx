import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { MessageInputData } from "../../models/formInterfaces/messageInputData";
import { User } from "../../models/user";
import MessagingService from "../../services/MessagingService";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { SuccessAlert } from "../alerts/SuccessAlert";

interface IAdvertiserInfoProps {
  advertiser: User | undefined;
  isLoggedIn: boolean;
}

const AdvertiserInfo: React.FunctionComponent<IAdvertiserInfoProps> = ({
  advertiser,
  isLoggedIn,
}) => {
  const { handleSubmit, register, reset } = useForm<MessageInputData>();

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    mutateAsync: submitMessage,
  } = useMutation({
    mutationFn: async (data: MessageInputData) => {
      if (!advertiser) return;
      return await MessagingService.sendMessageToAdvertiser(
        advertiser?.id,
        data.content
      );
    },
    onSuccess: () => reset(),
  });

  const submit = (data: MessageInputData) => {
    submitMessage(data);
  };

  return (
    <>
      <Card maxW="md">
        <CardHeader>
          <HStack>
            <Avatar
              name={`${advertiser?.firstName ?? "unkown"} ${
                advertiser?.lastName ?? "unknown"
              }`}
              size="lg"
            />
            <VStack marginLeft="10px">
              <Text
                fontSize="1.6rem"
                textColor="gray.600"
                fontWeight="semibold"
              >
                {`${advertiser?.firstName ?? "unkown"} ${
                  advertiser?.lastName ?? "unknown"
                }`}
              </Text>
              <Text
                className="card-text"
                fontSize="1.1rem"
                textColor="gray"
                fontWeight="semibold"
              >
                {`${advertiser?.email ?? "email unkown"}`}
              </Text>
            </VStack>
          </HStack>
        </CardHeader>
        <CardBody>
          {isLoggedIn ? (
            <form onSubmit={handleSubmit(submit)}>
              <VStack alignItems="start">
                <Text
                  className="card-text"
                  fontSize="1.1rem"
                  textColor="gray"
                  fontWeight="semibold"
                >
                  Message advertiser
                </Text>
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
                  alignSelf="end"
                  size="md"
                  type="submit"
                  height="40px"
                  bgColor="brandGreen.500"
                  textColor="white"
                  _hover={{ background: "brandGreen.700" }}
                >
                  Send
                </Button>
              </VStack>
            </form>
          ) : (
            <Text>Please login to send messages to advertiser</Text>
          )}
          <Flex justifyContent="center" alignItems="center" marginTop="10px">
            {isLoading && <Spinner />}
            {isError && error instanceof AxiosError && (
              <ErrorAlert error={error}></ErrorAlert>
            )}
            {isSuccess && <SuccessAlert message="Message sent!" />}
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default AdvertiserInfo;
