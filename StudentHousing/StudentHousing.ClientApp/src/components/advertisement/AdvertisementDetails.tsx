import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useState, useEffect } from "react";
import { AdvertisementDetailsData } from "../../models/advertisement/advertisementDetailsDatal";
import { User } from "../../models/user";
import ImageService from "../../services/ImageService";
import UserService from "../../services/UserService";
import AdvertiserInfo from "../messaging/AdvertiserInfo";

interface IAdvertisementDetailsProps {
  advertisement: AdvertisementDetailsData;
  isLoggedIn: boolean;
}

const AdvertisementDetails: React.FunctionComponent<
  IAdvertisementDetailsProps
> = ({ advertisement, isLoggedIn }) => {
  var base64Image = ImageService.convertToBase64Image(advertisement.image);
  const [advertiser, setAdvertiser] = useState<User>();

  useEffect(() => {
    fetchAdvertisement();
  }, []);

  const fetchAdvertisement = async () => {
    const searchParams = new URLSearchParams();
    searchParams.append("id", advertisement.advertiserId.toString());
    var userDetails = await UserService.getUserDetails(searchParams);
    setAdvertiser(userDetails.at(0));
  };
  return (
    <>
      <Flex width="75%" marginY="20px" flexWrap="wrap" justifyContent="center">
        <Box width="50%" minWidth="600px" overflow="hidden">
          <Box border="4px" overflow="hidden" maxWidth="500px">
            <Image width="100%" height="auto" src={base64Image}></Image>
          </Box>
          <Heading fontSize="2rem" textColor="gray.600">
            {advertisement.monthlyPrice} Ft/month
          </Heading>
          <Heading fontSize="1.8rem" fontWeight="600" textColor="gray.600">
            {advertisement.streetName +
              " " +
              advertisement.streetNumber +
              " " +
              advertisement.unitNumber}
          </Heading>
          <Heading fontSize="1.3rem" fontWeight="400" textColor="gray.600">
            {advertisement.city.toUpperCase() != "BUDAPEST"
              ? advertisement.postalCode + " " + advertisement.city
              : advertisement.postalCode +
                " " +
                advertisement.city +
                ", " +
                advertisement.district}
          </Heading>
          <Heading fontSize="1.3rem" fontWeight="400" textColor="gray.600">
            {advertisement.region} vármegye
          </Heading>
        </Box>
        <TableContainer margin="40px">
          <Table minWidth="400px">
            <Thead></Thead>
            <Tbody>
              <Tr>
                <Th>Number of Rooms:</Th>
                <Td>{advertisement.numberOfRooms}</Td>
              </Tr>
              <Tr>
                <Th>Size</Th>
                <Td>{advertisement.size} m²</Td>
              </Tr>
              <Tr>
                <Th>Is it furnished?</Th>
                <Td>{advertisement.furnished ? "Yes" : "No"}</Td>
              </Tr>
              <Tr>
                <Th>Is there parking available?</Th>
                <Td>{advertisement.parking ? "Yes" : "No"}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Box>
        <Heading fontSize="1.8rem" textColor="gray.600" marginTop="30px">
          Description
        </Heading>
        <Text>{advertisement.description}</Text>
      </Box>
      <AdvertiserInfo advertiser={advertiser} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default AdvertisementDetails;
