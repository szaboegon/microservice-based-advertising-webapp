import { Flex, Heading, Image, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import BannerImg from "../assets/images/bannerimg.jpg";
import { AdvertisementInfo } from "../models/advertisement/advertisementInfo";
import AdvertisementService from "../services/advertisementService";
import AdvertisementCard from "../components/advertisement/AdvertisementCard";
import SearchBar from "../components/shared/SearchBar";
import { useState } from "react";
import { ErrorAlert } from "../components/shared/alerts/ErrorAlert";
import { pageSubheadingStyles } from "../styles/pageSubheadingStyles";
import { useNavigate } from "react-router-dom";
import { AdvertisementSearchParams } from "../models/queryParams/advertisementSearchParams";
import SearchParamsHelper from "../helpers/searchParamsHelper";

export const Home = () => {
  const [advertisements, setAdvertisements] = useState<AdvertisementInfo[]>([]);
  const navigate = useNavigate();

  const {
    isSuccess,
    isLoading,
    isError,
    isRefetching,
    error,
  } = useQuery({
    queryKey: ["advertismentcards"],
    queryFn: async () => {
      return await AdvertisementService.getLatests(4);
    },
    onSuccess: (data: AdvertisementInfo[]) => setAdvertisements(data),
    refetchOnWindowFocus: false,
  });

  const onSearchSubmitted = (newParams: AdvertisementSearchParams) => {
    let searchParams = SearchParamsHelper.addSearchParams(
      new URLSearchParams(),
      newParams,
    );
    searchParams = SearchParamsHelper.addPaginationParams(searchParams);
    navigate("/search?" + searchParams, {});
  };

  return (
    <>
      <Flex
        height="600px"
        overflow="hidden"
        position="relative"
        justifyContent="center"
      >
        <Image
          src={BannerImg}
          alignSelf="end"
          height="auto"
          minWidth="2000px"
        ></Image>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          width="100%"
          height="100%"
        >
          <Heading textColor="white" size="3xl" textAlign="center">
            Apartment finding made easy
          </Heading>
          <Heading
            textColor="brandYellow.500"
            size="2xl"
            marginBottom="50px"
            textAlign="center"
          >
            For Everyone
          </Heading>
          <SearchBar
            minWidth="75%"
            onSearchParamsChanged={onSearchSubmitted}
          ></SearchBar>
        </Flex>
      </Flex>
      <Heading sx={pageSubheadingStyles} textAlign="center" marginY="2.5rem">
        Recent Advertisements
      </Heading>
      <SimpleGrid
        margin="1rem"
        columns={{ base: 1, sm: 2, md: 3, xl: 4 }}
        spacing="8"
        marginX={{ base: "0px", "2xl": "12%" }}
      >
        {isSuccess && advertisements?.map((advertisement) => (
            <AdvertisementCard
              key={advertisement.id}
              advertisement={advertisement}
            ></AdvertisementCard>
          ))}
      </SimpleGrid>
      <Flex flexDirection="column" alignItems="center" width="100%">
        {(isLoading || isRefetching) && <Spinner />}
        {isError && !isLoading && !isRefetching && error instanceof Error && (
          <ErrorAlert error={error} />
        )}
      </Flex>
    </>
  );
};
