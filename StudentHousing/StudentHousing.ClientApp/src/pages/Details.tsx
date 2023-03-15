import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  VStack,
  Image,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AdvertisementDetails from "../components/AdvertisementDetails";
import { AdvertisementDetailsData } from "../models/advertisementDetailsData.model";

export const Details = () => {
  const [advertisement, setAdvertisement] = useState<AdvertisementDetailsData>({
    id: 0,
    categoryName: "",
    region: "",
    postalCode: 0,
    city: "",
    district: "",
    streetName: "",
    streetNumber: "",
    unitNumber: "",
    numberOfRooms: 0,
    size: 0,
    furnished: false,
    parking: false,
    description: "",
    monthlyPrice: 0,
  });

  let params = useParams();

  const getAdvertisement = async () => {
    let response = await fetch("/api/advertisement/" + params.id);
    if (response.ok) {
      let json = await response.json();
      setAdvertisement(json);
    } else {
      alert("HTTP-Error:" + response.status);
    }
  };

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
              <BreadcrumbLink as={Link} to="/details">
                Details
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </VStack>
        <AdvertisementDetails
          advertisement={advertisement}
        ></AdvertisementDetails>
      </Flex>
    </>
  );
};
