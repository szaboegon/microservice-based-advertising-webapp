import { ChevronDownIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Spacer,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  background,
} from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router-dom";

interface INavbarProps {}

const isLoggedIn = true;

const Navbar: React.FunctionComponent<INavbarProps> = (props) => {
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
        >
          Student Housing
        </Heading>
        <Spacer />
        {isLoggedIn ? (
          <HStack spacing="15px" mr="40px">
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
            <Menu>
              <MenuButton
                as={Button}
                minH="50px"
                variant="link"
                rightIcon={<ChevronDownIcon />}
                textColor="white"
              >
                Username
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Messages</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
            <Button minH="50px" variant="link" textColor="white">
              Logout
            </Button>
          </HStack>
        ) : (
          <HStack spacing="15px" mr="40px">
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
            <Button minH="50px" variant="link" textColor="white">
              Login
            </Button>
          </HStack>
        )}
      </Flex>
    </>
  );
};

export default Navbar;
