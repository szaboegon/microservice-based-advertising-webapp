import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdvertisementDetails from "../components/AdvertisementDetails";
import { AdvertisementDetailsData } from "../models/advertisementDetailsData.model";
import AdvertisementService from "../services/AdvertisementService";
import { useQuery } from "react-query";
import { ErrorAlert } from "../components/Alerts/ErrorAlert";

export const Details = () => {
  const [advertisement, setAdvertisement] =
    useState<AdvertisementDetailsData>();

  let params = useParams();

  const {
    isSuccess,
    isLoading,
    isError,
    data,
    error,
    refetch: getAdvertisement,
  } = useQuery({
    queryKey: "advertisment",
    queryFn: async () => {
      if (params.id) {
        return await AdvertisementService.findById(+params.id);
      }
    },
    onSuccess: (data: AdvertisementDetailsData) => setAdvertisement(data),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    getAdvertisement();
  }, []);

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        flexDirection="column"
      >
        <VStack minWidth="75%">
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

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/search">
                Search
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} to={"/details/" + params.id}>
                Details
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </VStack>
        {isLoading && <div>Loading...</div>}
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
