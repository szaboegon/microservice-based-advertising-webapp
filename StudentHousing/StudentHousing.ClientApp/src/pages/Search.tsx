import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Box,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AdvertisementCard from "../components/AdvertisementCard";
import SearchBar from "../components/SearchBar";
import { AdvertisementCardData } from "../models/advertisementCardData.model";
import { SearchParams } from "../models/searchParams.model";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [advertisements, setAdvertisements] = useState<AdvertisementCardData[]>(
    []
  );
  const getAdvertisements = async () => {
    let response = await fetch("/api/advertisement?" + searchParams);
    if (response.ok) {
      let json = await response.json();
      setAdvertisements(json);
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  const renderNoResultsFoundAlert = () => {
    return (
      <>
        <Alert status="warning" maxWidth="600px">
          <AlertIcon />
          <AlertTitle>
            There are no matching advertisements for your search filters.
          </AlertTitle>
        </Alert>
      </>
    );
  };

  useEffect(() => {
    getAdvertisements();
  }, [searchParams]);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        marginX="auto"
      >
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
              <BreadcrumbLink as={Link} to="/search">
                Search
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <SearchBar minWidth="100%"></SearchBar>
        </VStack>
      </Flex>
      <Flex
        marginY="50px"
        marginX="auto"
        flexWrap="wrap"
        justifyContent="center"
      >
        {advertisements.length == 0 && renderNoResultsFoundAlert()}
        {advertisements.map((advertisement) => (
          <AdvertisementCard
            key={advertisement.id}
            advertisement={advertisement}
          ></AdvertisementCard>
        ))}
      </Flex>
    </>
  );
};
