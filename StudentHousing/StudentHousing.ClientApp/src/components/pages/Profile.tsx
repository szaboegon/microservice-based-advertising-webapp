import { Flex, Heading, Spinner } from "@chakra-ui/react";
import ProfileCard from "../profile/ProfileCard";
import { User } from "../../models/user";
import { AdvertisementListItemData } from "../../models/advertisement/advertisementListItemData";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import AdvertisementService from "../../services/AdvertisementService";
import AdvertisementListItem from "../advertisement/AdvertisementListItem";
import { WarningAlert } from "../alerts/WarningAlert";
import { ErrorAlert } from "../alerts/ErrorAlert";

interface IProfileProps {
  user: User;
}

const Profile: React.FunctionComponent<IProfileProps> = ({ user }) => {
  const [advertisements, setAdvertisements] = useState<
    AdvertisementListItemData[]
  >([]);

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
    onSuccess: (data: AdvertisementListItemData[]) => setAdvertisements(data),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        marginX="auto"
        direction="column"
      >
        <ProfileCard user={user}></ProfileCard>
        <Heading marginY="2rem" textColor="gray.500">
          My Advertisements
        </Heading>
        <Flex flexDirection="column" gap="20px">
          {(isLoading || isRefetching) && <Spinner />}
          {isError && error instanceof Error && <ErrorAlert error={error} />}
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
