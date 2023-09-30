import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Spacer,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  HStack,
  IconButton,
  Icon,
  Divider,
} from "@chakra-ui/react";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { User } from "../../models/user";
import { NAVBAR_HEIGHT } from "../../assets/literals/constants";
import { useState } from "react";
import { HubConnection } from "@microsoft/signalr/dist/esm/HubConnection";

interface INavbarProps {
  user: User | undefined;
  logout: () => void;
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ user, logout }) => {
  const [connection, setConnection] = useState<HubConnection | undefined>();
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
          Student Housing
        </Heading>
        <Spacer />
        <Button
          marginRight="30px"
          as={Link}
          to="/newadvertisement"
          minH="50px"
          background="brandYellow.600"
          textColor="white"
          _hover={{ background: "brandYellow.1000" }}
        >
          New Advertisement
        </Button>
        {user ? (
          <HStack
            verticalAlign="center"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              as={Link}
              to="/messages"
              aria-label="Messages"
              backgroundColor="brandGreen.500"
              icon={
                <Box className="material-icons" textColor="white">
                  mail
                </Box>
              }
            ></IconButton>
            <Button
              as={Link}
              to="/profile"
              aria-label="Profile"
              backgroundColor="brandGreen.500"
              textColor="white"
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
          <></>
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
            minH="50px"
            textColor="white"
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
            as={NavLink}
            to="/login"
            minH="50px"
            variant="link"
            textColor="white"
            mr="40px"
          >
            Login
          </Button>
        )}
      </Flex>
    </>
  );
};

export default Navbar;
