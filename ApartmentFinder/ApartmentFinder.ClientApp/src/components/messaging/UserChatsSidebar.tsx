import {Box, Card, Flex, Heading, Spinner, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import * as React from "react";
import {User} from "../../models/user";
import {useQuery} from "react-query";
import MessagingService from "../../services/messagingService";
import ChatTab from "./ChatTab";
import {AxiosError} from "axios";
import {ErrorAlert} from "../shared/alerts/ErrorAlert";
import {WarningAlert} from "../shared/alerts/WarningAlert";
import UserService from "../../services/userService";
import {UserChatDto} from "../../models/userChatDto";
import {pageSubheadingStyles} from "../../styles/pageSubheadingStyles";
import {useLocation} from "react-router-dom";

interface IPartnersSidebarProps {
    notifyChatSelected: (chat: UserChatDto, partner: User) => void;
    flex?: any;
}

const UserChatsSidebar: React.FunctionComponent<IPartnersSidebarProps> = ({
                                                                              notifyChatSelected,
                                                                              flex,
                                                                          }) => {
    const [selectedChat, setSelectedChat] = useState<UserChatDto>();
    const [chats, setChats] = useState<UserChatDto[]>([]);
    const [chatPartners, setChatPartners] = useState<User[]>([]);

    const location = useLocation();

    useEffect(() => {
        const advertiserId = location.state?.advertiserId;
        const advertisementId = location.state?.advertisementId;
        const chat = chats.find(
            (c) =>
                c.partnerId == advertiserId && c.advertisementId == advertisementId,
        );
        const partner = chatPartners.find((p) => p.id == advertiserId);
        if (chat && partner) {
            setSelectedChat(chat);
            notifyChatSelected(chat, partner);
        }
    }, [chats, chatPartners]);

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

    const handleItemClick = (chat: UserChatDto, partner: User) => {
        setSelectedChat(chat);
        notifyChatSelected(chat, partner);
    };

    return (
        <>
            <Card
                justifyContent="start"
                alignItems="center"
                variant="elevated"
                flex={flex}
                height="100%"
                boxShadow="3px 3px 5px #d3d3d3"
                zIndex="2"
            >
                <Box width="100%" height="80px">
                    <Heading sx={pageSubheadingStyles} padding="20px">
                        Chats
                    </Heading>
                </Box>
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
                                    chat={chat}
                                    handleClick={handleItemClick}
                                    isSelected={selectedChat?.uniqueName == chat.uniqueName}
                                />
                            ))}
                        {(isLoadingChats ||
                                isRefetchingChats ||
                                isLoadingPartnerData ||
                                isRefetchingPartnerData) &&
                            chatPartners.length <= 0 && <Spinner/>}

                        {(isErrorChats || isErrorPartnerData) &&
                            !isLoadingChats &&
                            !isRefetchingChats &&
                            errorChats instanceof AxiosError && (
                                <ErrorAlert error={errorChats}/>
                            )}

                        {isSuccessPartnerData &&
                            isSuccessChats &&
                            chatPartners.length <= 0 &&
                            !isRefetchingChats &&
                            !isRefetchingPartnerData && (
                                <WarningAlert message="You have no private chats yet."/>
                            )}
                    </Flex>
                </VStack>
            </Card>
        </>
    );
};

export default UserChatsSidebar;
