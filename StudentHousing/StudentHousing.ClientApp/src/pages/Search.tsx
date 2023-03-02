import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Box,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AdCard from "../components/AdCard";
import SearchBar from "../components/SearchBar";

export const Search = () => {
  return (
    <>
      <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
        <VStack minWidth="75%">
          <Breadcrumb
            marginY="10px"
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            width="100%"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} to="/housing">
                Housing
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <SearchBar minWidth="100%"></SearchBar>
        </VStack>
      </Flex>
      <Flex margin="50px" flexWrap="wrap" justifyContent="center">
        <AdCard></AdCard>
        <AdCard></AdCard>
        <AdCard></AdCard>
        <AdCard></AdCard>
        <AdCard></AdCard>
        <AdCard></AdCard>
      </Flex>
    </>
  );
};
