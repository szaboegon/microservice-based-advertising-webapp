import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { MessageInputData } from "../../models/formInterfaces/messageInputData";
import { User } from "../../models/user";
import MessagingService from "../../services/MessagingService";

interface IAdvertiserInfoProps {
  advertiser: User | undefined;
  isLoggedIn: boolean;
}

const AdvertiserInfo: React.FunctionComponent<IAdvertiserInfoProps> = ({
  advertiser,
  isLoggedIn,
}) => {
  const { handleSubmit, register, reset } = useForm<MessageInputData>();

  const submit = (data: MessageInputData) => {
    if (!advertiser) return;
    MessagingService.sendMessageToAdvertiser(advertiser?.id, data.content);
    reset();
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
        </CardBody>
      </Card>
    </>
  );
};

export default AdvertiserInfo;
