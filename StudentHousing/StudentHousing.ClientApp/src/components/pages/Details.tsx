import { Flex, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AdvertisementDetails from "../advertisement/details/AdvertisementDetails";
import { AdvertisementDetailsData } from "../../models/advertisement/advertisementDetailsData";
import AdvertisementService from "../../services/AdvertisementService";
import { useQuery } from "react-query";
import { ErrorAlert } from "../alerts/ErrorAlert";

interface IDetailsProps {
  isLoggedIn: boolean;
}

const Details: React.FunctionComponent<IDetailsProps> = ({ isLoggedIn }) => {
  const [advertisement, setAdvertisement] =
    useState<AdvertisementDetailsData>();

  let params = useParams();

  const { isSuccess, isLoading, isError, data, error } = useQuery({
    queryKey: "advertisment",
    queryFn: async () => {
      if (params.id) {
        return await AdvertisementService.findById(+params.id);
      }
    },
    onSuccess: (data: AdvertisementDetailsData) => setAdvertisement(data),
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
