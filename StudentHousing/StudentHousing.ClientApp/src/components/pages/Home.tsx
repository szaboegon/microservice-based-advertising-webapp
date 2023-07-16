import { Flex, Image, Box, Heading, Card, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import BannerImg from "../../assets/images/bannerimg.jpg";
import { AdvertisementCardData } from "../../models/advertisement/advertisementCardData.";
import AdvertisementService from "../../services/AdvertisementService";
import AdvertisementCard from "../advertisement/AdvertisementCard";
import SearchBar from "../shared/SearchBar";
import { useState } from "react";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { pageSubheadingStyles } from "../../styles/pageSubheadingStyles";

export const Home = () => {
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
      return await AdvertisementService.getLatests(3);
    },
    onSuccess: (data: AdvertisementCardData[]) => setAdvertisements(data),
    refetchOnWindowFocus: false,
  });

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
          placeholder="Image by benzoix</a> on Freepik"
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
            For Students
          </Heading>
          <SearchBar minWidth="75%"></SearchBar>
        </Flex>
      </Flex>
      <Heading sx={pageSubheadingStyles}>Recent Advertisements</Heading>
      <Flex margin="1rem" flexWrap="wrap" justifyContent="center">
        {(isLoading || isRefetching) && <Spinner />}
        {isError && !isLoading && !isRefetching && error instanceof Error && (
          <ErrorAlert error={error} />
        )}
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
