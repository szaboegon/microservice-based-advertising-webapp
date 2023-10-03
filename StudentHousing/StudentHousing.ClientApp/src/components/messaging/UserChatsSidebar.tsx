import { Card, Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import * as React from "react";
import { User } from "../../models/user";
import { useQuery } from "react-query";
import MessagingService from "../../services/messagingService";
import ChatTab from "./ChatTab";
import { AxiosError } from "axios";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { WarningAlert } from "../alerts/WarningAlert";
import UserService from "../../services/userService";
import { NAVBAR_HEIGHT } from "../../assets/literals/constants";
import { UserChatDto } from "../../models/userChatDto";
import { AdvertisementCardDto } from "../../models/advertisement/advertisementCardDto";

interface IPartnersSidebarProps {
  selectChat: (chatPartner: User, advertisementId: number) => void;
  width?: any;
}

const UserChatsSidebar: React.FunctionComponent<IPartnersSidebarProps> = ({
  selectChat,
  width,
}) => {
  const [chats, setChats] = useState<UserChatDto[]>([]);
  const [chatPartners, setChatPartners] = useState<User[]>([]);
  const {
    isSuccess: isSuccessChats,
    isLoading: isLoadingChats,
    isError: isErrorChats,
    isRefetching: isRefetchingChats,
    error: errorChats,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      return await MessagingService.getPrivateChatsForUser();
    },
    onSuccess: (data: UserChatDto[]) => setChats(data),
    refetchOnWindowFocus: false,
  });

  const {
    isSuccess: isSuccessPartnerData,
    isLoading: isLoadingPartnerData,
    isError: isErrorPartnerData,
    isRefetching: isRefetchingPartnerData,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      const chatPartnerIds = chats?.map((c) => c.partnerId);
      chatPartnerIds?.forEach((id) => {
        queryParams.append("id", id.toString());
      });
      return await UserService.getUserDetails(queryParams);
    },
    onSuccess: (data: User[]) => setChatPartners(data),
    refetchOnWindowFocus: false,
    enabled: chats.length > 0,
  });

  return (
    <>
      <Card
        justifyContent="start"
        alignItems="center"
        paddingY="80px"
        variant="elevated"
        width={width}
        height="100%"
        boxShadow="3px 3px 5px #d3d3d3"
        zIndex="2"
      >
        <VStack width="100%">
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="100%"
          >
            {isSuccessPartnerData &&
              chats.map((chat) => (
                <ChatTab
                  key={chat.uniqueName}
                  chatPartner={chatPartners.find((p) => p.id == chat.partnerId)}
                  advertisementId={chat.advertisementId}
                  selectChat={selectChat}
                />
              ))}
            {(isLoadingChats ||
              isRefetchingChats ||
              isLoadingPartnerData ||
              isRefetchingPartnerData) &&
              chatPartners.length <= 0 && <Spinner />}

            {(isErrorChats || isErrorPartnerData) &&
              !isLoadingChats &&
              !isRefetchingChats &&
              errorChats instanceof AxiosError && (
                <ErrorAlert error={errorChats} />
              )}

            {isSuccessPartnerData &&
              isSuccessChats &&
              chatPartners.length <= 0 &&
              !isRefetchingChats &&
              !isRefetchingPartnerData && (
                <WarningAlert message="You have no private chats yet." />
              )}
          </Flex>
        </VStack>
      </Card>
    </>
  );
};

export default UserChatsSidebar;
