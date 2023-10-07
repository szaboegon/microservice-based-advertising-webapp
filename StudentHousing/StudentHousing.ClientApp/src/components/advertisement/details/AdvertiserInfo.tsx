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
import { useMutation, useQuery } from "react-query";
import { MessageInputData } from "../../../models/forms/messageInputData";
import { User } from "../../../models/user";
import MessagingService from "../../../services/messagingService";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { SuccessAlert } from "../../alerts/SuccessAlert";
import userService from "../../../services/userService";
import { useState } from "react";
import UserService from "../../../services/userService";

interface IAdvertiserInfoProps {
  advertiserId: number;
  advertisementId: number;
  isLoggedIn: boolean;
}

const AdvertiserInfo: React.FunctionComponent<IAdvertiserInfoProps> = ({
  advertiserId,
  advertisementId,
  isLoggedIn,
}) => {
  const [advertiser, setAdvertiser] = useState<User>();

  const {
    isSuccess: isSuccessUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isRefetching: isRefetchingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["advertiserInfo"],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.append("id", advertiserId.toString());
      return await UserService.getUserDetails(searchParams);
    },
    onSuccess: (data: User[]) => {
      setAdvertiser(data.at(0));
    },
    refetchOnWindowFocus: false,
  });

  const { handleSubmit, register, reset } = useForm<MessageInputData>();

  const {
    isSuccess: isSuccessMsg,
    isLoading: isLoadingMsg,
    isError: isErrorMsg,
    error: errorMsg,
    mutateAsync: submitMessage,
  } = useMutation({
    mutationFn: async (data: MessageInputData) => {
      if (!advertiser) return;
      return await MessagingService.sendMessageToAdvertiser(
        advertiser.id,
        advertisementId,
        data.content,
      );
    },
    onSuccess: () => reset(),
  });

  const submit = (data: MessageInputData) => {
    submitMessage(data);
  };

  return (
    <>
      <Card
        width="530px"
        variant="elevated"
        maxHeight="400px"
        alignSelf="center"
      >
        {isSuccessUser && advertiser && (
          <Box>
            <CardHeader height="120px">
              <HStack>
                <Avatar
                  name={`${advertiser.firstName} ${advertiser.lastName}`}
                  size="lg"
                />
                <VStack marginLeft="10px" alignItems="start">
                  <Text
                    fontSize="1.6rem"
                    textColor="gray.600"
                    fontWeight="semibold"
                  >
                    {`${advertiser.firstName} ${advertiser.lastName}`}
                  </Text>
                  <Text
                    className="card-text"
                    fontSize="1.1rem"
                    textColor="gray"
                    fontWeight="semibold"
                  >
                    {`${advertiser.email}`}
                  </Text>
                </VStack>
              </HStack>
            </CardHeader>
            <CardBody>
              {isLoggedIn &&
              advertiser.id != userService.getCurrentUser()?.id ? (
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
                      height="100px"
                      size="md"
                      borderColor="brandYellow.800"
                    ></Textarea>
                    <Button
                      width="100%"
                      alignSelf="end"
                      type="submit"
                      height="40px"
                      bgColor="brandGreen.500"
                      textColor="white"
                      marginTop="10px"
                      _hover={{ background: "brandGreen.700" }}
                    >
                      Send
                    </Button>
                  </VStack>
                </form>
              ) : (
                <Text
                  fontSize="1.1rem"
                  fontWeight="semibold"
                  textColor="gray.600"
                  textAlign="center"
                >
                  {advertiser.id != userService.getCurrentUser()?.id
                    ? "Please login to send messages to the advertiser"
                    : "This is your own advertisement"}
                </Text>
              )}
              <Flex
                justifyContent="center"
                alignItems="center"
                marginTop="10px"
              >
                {isLoadingMsg && <Spinner />}
                {isErrorMsg && errorMsg instanceof AxiosError && (
                  <ErrorAlert error={errorMsg}></ErrorAlert>
                )}
                {isSuccessMsg && <SuccessAlert message="Message sent!" />}
              </Flex>
            </CardBody>
          </Box>
        )}
        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          marginX="10px"
        >
          {isLoadingUser && <Spinner />}
          {isErrorUser && errorUser instanceof AxiosError && (
            <ErrorAlert error={errorUser}></ErrorAlert>
          )}
        </Flex>
      </Card>
    </>
  );
};

export default AdvertiserInfo;
