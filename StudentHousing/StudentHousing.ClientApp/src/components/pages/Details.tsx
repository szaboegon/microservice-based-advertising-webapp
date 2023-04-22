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
import { Link, useParams } from "react-router-dom";
import AdvertisementDetails from "../advertisement/AdvertisementDetails";
import { AdvertisementDetailsData } from "../../models/advertisement/advertisementDetailsDatal";
import AdvertisementService from "../../services/AdvertisementService";
import { useQuery } from "react-query";
import { ErrorAlert } from "../alerts/ErrorAlert";

export const Details = () => {
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
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        marginX="auto"
      >
        {isLoading && <Spinner marginTop="10%" />}
        {isError && error instanceof Error && (
          <ErrorAlert error={error}></ErrorAlert>
        )}
        {isSuccess && advertisement && (
          <AdvertisementDetails
            advertisement={advertisement}
          ></AdvertisementDetails>
        )}
      </Flex>
    </>
  );
};
