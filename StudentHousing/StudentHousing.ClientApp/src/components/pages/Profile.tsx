import { Flex, Heading, Spinner } from "@chakra-ui/react";
import ProfileCard from "../profile/ProfileCard";
import { User } from "../../models/user";
import { useState } from "react";
import { useQuery } from "react-query";
import AdvertisementService from "../../services/advertisementService";
import AdvertisementListItem from "../advertisement/AdvertisementListItem";
import { WarningAlert } from "../alerts/WarningAlert";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { AdvertisementCardDto } from "../../models/advertisement/advertisementCardDto";
import { pageSubheadingStyles } from "../../styles/pageSubheadingStyles";

interface IProfileProps {
  user: User;
}

const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
  const [advertisements, setAdvertisements] = useState<AdvertisementCardDto[]>(
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
      return await AdvertisementService.findByUser();
    },
    onSuccess: (data: AdvertisementCardDto[]) => setAdvertisements(data),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Flex alignItems="center" justifyContent="center" direction="column">
        <ProfileCard user={user}></ProfileCard>
        <Heading sx={pageSubheadingStyles}>My Advertisements</Heading>
        <Flex flexDirection="column" gap="20px" marginBottom="20px">
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
