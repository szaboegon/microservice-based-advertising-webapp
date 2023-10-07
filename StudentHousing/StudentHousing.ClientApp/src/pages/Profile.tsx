import { Box, Card, Divider, Flex, Heading, Spinner } from "@chakra-ui/react";
import ProfileCard from "../components/profile/ProfileCard";
import { User } from "../models/user";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AdvertisementService from "../services/advertisementService";
import AdvertisementListItem from "../components/advertisement/AdvertisementListItem";
import { WarningAlert } from "../components/alerts/WarningAlert";
import { ErrorAlert } from "../components/alerts/ErrorAlert";
import { AdvertisementCardDto } from "../models/advertisement/advertisementCardDto";
import { pageSubheadingStyles } from "../styles/pageSubheadingStyles";
import {
  NAVBAR_HEIGHT,
  PROFILE_CARD_WIDTH,
} from "../assets/literals/constants";

interface IProfileProps {
  user: User;
}

const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
  const [advertisements, setAdvertisements] = useState<AdvertisementCardDto[]>(
    [],
  );

  const {
    isSuccess,
    isLoading,
    isError,
    isRefetching,
    error,
    refetch: getAdvertisements,
  } = useQuery({
    queryKey: ["userAds"],
    queryFn: async () => {
      return await AdvertisementService.findByUser();
    },
    onSuccess: (advertisements: AdvertisementCardDto[]) =>
      setAdvertisements(advertisements),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Flex justifyContent="center" height={`calc(100vh - ${NAVBAR_HEIGHT})`}>
        <Flex
          flexDirection="column"
          position="relative"
          alignItems="center"
          width="50%"
          gap="15px"
        >
          <Box
            position="absolute"
            left={`calc(-${PROFILE_CARD_WIDTH} - 20px)`}
            top="150px"
          >
            <ProfileCard user={user}></ProfileCard>
          </Box>
          <Heading
            sx={pageSubheadingStyles}
            alignSelf="start"
            marginTop="1.5rem"
          >
            My Advertisements
          </Heading>
          <Divider
            alignSelf="start"
            orientation="horizontal"
            borderColor="gray.600"
            borderWidth="1px"
            borderRadius="10"
            width="290px"
          />
          {(isLoading || isRefetching) && <Spinner alignSelf="center" />}
          {isError && !isLoading && !isRefetching && error instanceof Error && (
            <ErrorAlert error={error} />
          )}
          {advertisements.map((advertisement) => (
            <AdvertisementListItem
              key={advertisement.id}
              advertisement={advertisement}
              refetch={getAdvertisements}
            ></AdvertisementListItem>
          ))}
          {isSuccess && advertisements.length <= 0 && !isRefetching && (
            <WarningAlert message="You haven't posted any advertisements yet." />
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Profile;
