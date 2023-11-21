import { Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AdvertisementDetails from "../components/advertisement/details/AdvertisementDetails";
import { Advertisement } from "../models/advertisement/advertisement";
import AdvertisementService from "../services/advertisementService";
import { useQuery } from "react-query";
import { ErrorAlert } from "../components/shared/alerts/ErrorAlert";

interface IDetailsProps {
  isLoggedIn: boolean;
}

const Details: React.FunctionComponent<IDetailsProps> = ({ isLoggedIn }) => {
  const [advertisement, setAdvertisement] = useState<Advertisement>();

  let params = useParams();

  const { isSuccess, isLoading, isError, data, error } = useQuery({
    queryKey: "advertisementDetails",
    queryFn: async () => {
      if (params.id) {
        return await AdvertisementService.findById(+params.id);
      }
    },
    onSuccess: (data: Advertisement) => setAdvertisement(data),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Flex marginY="20px" marginX="auto" justifyContent="center">
        {isLoading && <Spinner marginTop="10%" />}
        {isError && error instanceof Error && (
          <ErrorAlert error={error}></ErrorAlert>
        )}
        {isSuccess && advertisement && (
          <AdvertisementDetails
            advertisement={advertisement}
            isLoggedIn={isLoggedIn}
          ></AdvertisementDetails>
        )}
      </Flex>
    </>
  );
};

export default Details;
