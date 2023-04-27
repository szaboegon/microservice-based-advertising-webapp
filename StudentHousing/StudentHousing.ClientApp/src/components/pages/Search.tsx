import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  HStack,
  Spacer,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import AdvertisementCard from "../advertisement/AdvertisementCard";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { WarningAlert } from "../alerts/WarningAlert";
import SearchBar from "../shared/SearchBar";
import { AdvertisementCardData } from "../../models/advertisement/advertisementCardData.";
import AdvertisementService from "../../services/AdvertisementService";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [advertisements, setAdvertisements] = useState<AdvertisementCardData[]>(
    []
  );

  const {
    isSuccess,
    isLoading,
    isError,
    isRefetching,
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
        <VStack marginTop="3rem" width={{ base: "100%", xl: "80%" }}>
          <SearchBar minWidth="100%"></SearchBar>
        </VStack>
      </Flex>
      <Flex
        marginY="50px"
        marginX="auto"
        flexWrap="wrap"
        justifyContent="center"
      >
        {(isLoading || isRefetching) && advertisements.length <= 0 && (
          <Spinner />
        )}
        {isError && error instanceof Error && <ErrorAlert error={error} />}
        {advertisements.map((advertisement) => (
          <AdvertisementCard
            key={advertisement.id}
            advertisement={advertisement}
          ></AdvertisementCard>
        ))}
        {isSuccess && advertisements.length <= 0 && !isRefetching && (
          <WarningAlert message="There are no matching advertisements for your search filters." />
        )}
      </Flex>
    </>
  );
};
