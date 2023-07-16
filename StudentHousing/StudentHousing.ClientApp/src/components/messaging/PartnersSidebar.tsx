import { Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import * as React from "react";
import { User } from "../../models/user";
import { useQuery } from "react-query";
import MessagingService from "../../services/MessagingService";
import ChatTab from "./ChatTab";
import { AxiosError } from "axios";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { WarningAlert } from "../alerts/WarningAlert";
import UserService from "../../services/UserService";

interface IPartnersSidebarProps {
  setSelectedChatPartner: React.Dispatch<
    React.SetStateAction<User | undefined>
  >;
}

const PartnersSidebar: React.FunctionComponent<IPartnersSidebarProps> = ({
  setSelectedChatPartner,
}) => {
  const [chatPartnerIds, setChatPartnerIds] = useState<number[] | undefined>(
    undefined
  );
  const [chatPartners, setChatPartners] = useState<User[]>([]);
  const {
    isSuccess: isSuccessPartnerIds,
    isLoading: isLoadingPartnerIds,
    isError: isErrorPartnerIds,
    isRefetching: isRefetchingPartnerIds,
    error: errorPartnerIds,
  } = useQuery({
    queryKey: ["partnerIds"],
    queryFn: async () => {
      return await MessagingService.getChatPartnersForUser();
    },
    onSuccess: (data: number[]) => setChatPartnerIds(data),
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
      chatPartnerIds?.forEach((id) => {
        queryParams.append("id", id.toString());
      });
      return await UserService.getUserDetails(queryParams);
    },
    onSuccess: (data: User[]) => setChatPartners(data),
    refetchOnWindowFocus: false,
    enabled: !!chatPartnerIds,
  });

  return (
    <>
      <VStack
        flex="20%"
        borderColor="brandGreen.500"
        borderWidth="medium"
        backgroundColor="brandGreen.300"
        height={"calc(100vh - 80px)"}
        alignItems="start"
        minWidth="300px"
      >
        <Heading
          fontSize="1.8rem"
          color="white"
          marginY="15px"
          marginLeft="5px"
        >
          Private Chats
        </Heading>
        <Flex justifyContent="center" alignItems="center" width="100%">
          {isSuccessPartnerData &&
            chatPartners.map((partner) => (
              <ChatTab
                key={partner.id}
                chatPartner={partner}
                setSelectedChatPartner={setSelectedChatPartner}
              />
            ))}
          {(isLoadingPartnerIds ||
            isRefetchingPartnerIds ||
            isLoadingPartnerData ||
            isRefetchingPartnerData) &&
            chatPartners.length <= 0 && <Spinner />}

          {(isErrorPartnerIds || isErrorPartnerData) &&
            !isLoadingPartnerIds &&
            !isRefetchingPartnerIds &&
            errorPartnerIds instanceof AxiosError && (
              <ErrorAlert error={errorPartnerIds} />
            )}

          {isSuccessPartnerData &&
            isSuccessPartnerIds &&
            chatPartners.length <= 0 &&
            !isRefetchingPartnerIds &&
            !isRefetchingPartnerData && (
              <WarningAlert message="You have no private chats yet." />
            )}
        </Flex>
      </VStack>
    </>
  );
};

export default PartnersSidebar;
