import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/user";
import { NAVBAR_HEIGHT } from "../../assets/literals/constants";
import MessagingService from "../../services/messagingService";
import { Message } from "../../models/message";
import { navbarButtonStyles } from "../../styles/navbarButtonStyles";
import { useSignalR } from "../../hooks/useSignalR";
import { useQuery } from "react-query";

interface INavbarProps {
  user: User | undefined;
  logout: () => void;
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ user, logout }) => {
  const [unreadMessageCount, setUnreadMessageCount] = useState<number>(0);
  const connection = useSignalR();

  const { refetch } = useQuery({
    queryKey: ["unreadMessages"],
    queryFn: MessagingService.getUnreadMessageCount,
    onSuccess: (count: number) => {
      setUnreadMessageCount(count);
    },
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (message: Message) =>
        onMessageReceived(message),
      );
      connection.on("MessagesRead", async (userId) => {
        await onMessagesRead(userId);
      });
    }
  }, [connection]);

  const onMessageReceived = (message: Message) => {
    if (message.senderId != user?.id) {
      setUnreadMessageCount(() => unreadMessageCount + 1);
    }
  };

  const onMessagesRead = async (userId: number) => {
    if (userId == user?.id) {
      await refetch();
    }
  };

  return (
    <>
      <Flex
        as="nav"
        h={NAVBAR_HEIGHT}
        bg="brandGreen.500"
        alignItems="center"
        gap="10px"
      >
        <Heading
          fontSize="2rem"
          ml="40px"
          textColor="white"
          as={Link}
          to="/"
          variant="hidden"
          display={{ base: "none", md: "block" }}
        >
          ApartmentFinder
        </Heading>
        <Spacer />
        {user ? (
          <HStack
            verticalAlign="center"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              as={Link}
              to="/newadvertisement"
              minH="50px"
              background="brandYellow.600"
              textColor="white"
              leftIcon={
                <Box className="material-icons" textColor="white">
                  add_home
                </Box>
              }
              _hover={{ background: "brandYellow.1000" }}
            >
              Add Advertisement
            </Button>
            <Box position="relative">
              <IconButton
                as={Link}
                to="/messages"
                aria-label="Messages"
                sx={navbarButtonStyles}
                icon={
                  <Box className="material-icons" textColor="white">
                    mail
                  </Box>
                }
              ></IconButton>
              {unreadMessageCount > 0 && (
                <Tag
                  backgroundColor="red"
                  position="absolute"
                  size="sm"
                  colorScheme="red"
                  left="6"
                  bottom="6"
                  borderRadius="100"
                  width="16px"
                  height="16px"
                  padding="0px"
                >
                  <TagLabel
                    width="100%"
                    textColor="white"
                    fontWeight="600"
                    fontSize="14"
                    textAlign="center"
                  >
                    {unreadMessageCount}
                  </TagLabel>
                </Tag>
              )}
            </Box>
            <Button
              as={Link}
              to="/profile"
              aria-label="Profile"
              sx={navbarButtonStyles}
              leftIcon={
                <Box className="material-icons" textColor="white">
                  account_circle
                </Box>
              }
            >
              {user.userName}
            </Button>
          </HStack>
        ) : (
          <Button
            width="110px"
            as={Link}
            to="/register"
            aria-label="Register"
            sx={navbarButtonStyles}
            leftIcon={
              <Box className="material-icons" textColor="white">
                person_add
              </Box>
            }
          >
            Sign up
          </Button>
        )}
        <Divider
          orientation="vertical"
          size="10px"
          marginX="10px"
          borderColor="brandGreen.700"
          borderWidth="2px"
          height="75%"
          borderRadius="10"
        />
        {user ? (
          <IconButton
            sx={navbarButtonStyles}
            onClick={logout}
            mr="40px"
            aria-label="Logout"
          >
            <Box className="material-icons" textColor="white">
              logout
            </Box>
          </IconButton>
        ) : (
          <Button
            marginRight="20px"
            width="85px"
            as={Link}
            to="/login"
            aria-label="Login"
            sx={navbarButtonStyles}
            leftIcon={
              <Box className="material-icons" textColor="white">
                login
              </Box>
            }
          >
            Login
          </Button>
        )}
      </Flex>
    </>
  );
};

export default Navbar;
