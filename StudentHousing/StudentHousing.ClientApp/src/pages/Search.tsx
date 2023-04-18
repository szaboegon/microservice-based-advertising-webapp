import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import AdvertisementCard from "../components/AdvertisementCard";
import { ErrorAlert } from "../components/Alerts/ErrorAlert";
import { WarningAlert } from "../components/Alerts/WarningAlert";
import SearchBar from "../components/SearchBar";
import { AdvertisementCardData } from "../models/advertisementCardData.";
import AdvertisementService from "../services/AdvertisementService";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [advertisements, setAdvertisements] = useState<AdvertisementCardData[]>(
    []
  );

  const {
    isSuccess,
    isLoading,
    isError,
    data,
    error,
    refetch: getAdvertisements,
  } = useQuery({
    queryKey: ["advertismentcards"],
    queryFn: async () => {
      return await AdvertisementService.findBySearchParams(searchParams);
    },
    onSuccess: (data: AdvertisementCardData[]) => setAdvertisements(data),
    refetchOnWindowFocus: false,
  });

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
        <VStack width={{ base: "100%", xl: "80%" }}>
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
        {isLoading && <Spinner />}
        {isError && error instanceof Error && <ErrorAlert error={error} />}
        {isSuccess &&
          advertisements.map((advertisement) => (
            <AdvertisementCard
              key={advertisement.id}
              advertisement={advertisement}
            ></AdvertisementCard>
          ))}
        {isSuccess && advertisements.length <= 0 && (
          <WarningAlert message="There are no matching advertisements for your search filters." />
        )}
      </Flex>
    </>
  );
};
