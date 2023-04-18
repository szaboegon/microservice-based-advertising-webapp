import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Spacer,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import axios from "axios";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import authHeader from "../services/auth/authHeader";
import { User } from "../models/user";

interface INavbarProps {
  user: User | undefined;
  logout: () => void;
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ user, logout }) => {
  const test = () => {
    axios
      .get("/api/user/validate", { headers: authHeader() })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Flex
        as="nav"
        minH="80px"
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
          <Menu>
            <MenuButton
              as={Button}
              minH="50px"
              variant="link"
              rightIcon={<ChevronDownIcon />}
              textColor="white"
            >
              {user.userName}
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Messages</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <></>
        )}
        {user ? (
          <Button
            minH="50px"
            variant="link"
            textColor="white"
            onClick={logout}
            mr="40px"
          >
            Logout
          </Button>
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
