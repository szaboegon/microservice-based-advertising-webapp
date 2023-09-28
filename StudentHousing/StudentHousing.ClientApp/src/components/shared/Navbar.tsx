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
} from "@chakra-ui/react";
import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { User } from "../../models/user";
import { NAVBAR_HEIGHT } from "../../assets/literals/constants";

interface INavbarProps {
  user: User | undefined;
  logout: () => void;
}

const Navbar: React.FunctionComponent<INavbarProps> = ({ user, logout }) => {
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
              <MenuItem as={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem as={Link} to="/messages">
                Messages
              </MenuItem>
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
