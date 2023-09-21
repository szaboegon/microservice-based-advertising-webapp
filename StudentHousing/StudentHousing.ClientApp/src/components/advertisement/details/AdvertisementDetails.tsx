import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  HStack,
  Badge,
  Card,
} from "@chakra-ui/react";
import * as React from "react";
import { useState, useEffect } from "react";
import { AdvertisementDetailsDto } from "../../../models/advertisement/advertisementDetailsDto";
import { User } from "../../../models/user";
import ImageService from "../../../services/imageService";
import UserService from "../../../services/userService";
import { detailsHeadingStyles } from "../../../styles/detailsHeadingStyles";
import AdvertiserInfo from "./AdvertiserInfo";

interface IAdvertisementDetailsProps {
  advertisement: AdvertisementDetailsDto;
  isLoggedIn: boolean;
}

const AdvertisementDetails: React.FunctionComponent<
  IAdvertisementDetailsProps
> = ({ advertisement, isLoggedIn }) => {
  let base64Image = ImageService.convertToBase64Image(advertisement.image);
  const [advertiser, setAdvertiser] = useState<User>();

  useEffect(() => {
    fetchAdvertisement();
  }, []);

  const fetchAdvertisement = async () => {
    //TODO add react query
    const searchParams = new URLSearchParams();
    searchParams.append("id", advertisement.advertiserId.toString());
    let userDetails = await UserService.getUserDetails(searchParams);
    setAdvertiser(userDetails.at(0));
  };
  return (
    <>
      <Box width={{ base: "100%", lg: "75%", xl: "60%" }}>
        <Flex position="absolute">
          <Badge fontSize="1.1rem" fontWeight="500" variant="solid">
            {advertisement.categoryName}
          </Badge>
        </Flex>
        <Flex flexWrap="nowrap" width="100%">
          <Flex
            width="100%"
            overflow="hidden"
            height="420px"
            borderWidth="2px"
            marginRight="20px"
            borderRadius="6px"
          >
            <Image
              objectFit="cover"
              minWidth="100%"
              minHeight="100%"
              src={base64Image}
            ></Image>
          </Flex>
          <AdvertiserInfo advertiser={advertiser} isLoggedIn={isLoggedIn} />
        </Flex>
        <Card marginTop="20px" variant="elevated" padding="20px">
          <Heading sx={detailsHeadingStyles} marginY="1rem">
            Property description
          </Heading>
          <Text>{advertisement.description}</Text>
          <Heading sx={detailsHeadingStyles} marginY="1rem">
            Details
          </Heading>
          <Flex
            flexWrap="wrap"
            fontSize="1.1rem"
            fontWeight="semibold"
            textColor="gray.600"
          >
            <HStack flex="50%">
              <Box className="material-icons" textColor="brandGreen.500">
                paid
              </Box>
              <Text>{advertisement.monthlyPrice} Ft/month</Text>
            </HStack>
            <HStack flex="50%">
              <Box className="material-icons" textColor="brandGreen.500">
                location_on
              </Box>
              <Text>
                {advertisement.region}, {advertisement.postalCode}{" "}
                {advertisement.city},{" "}
                {advertisement.city.toUpperCase() == "BUDAPEST"
                  ? advertisement.district
                  : ""}{" "}
                {advertisement.streetName} {advertisement.streetNumber}
              </Text>
            </HStack>
            <HStack flex="50%" marginTop="5px">
              <Box className="material-icons" textColor="brandGreen.500">
                meeting_room
              </Box>
              <Text>{advertisement.numberOfRooms} rooms</Text>
            </HStack>
            <HStack flex="50%" marginTop="5px">
              <Box
                className="material-icons"
                marginLeft="2px"
                textColor="brandGreen.500"
              >
                square_foot
              </Box>
              <Text>{advertisement.size} m²</Text>
            </HStack>
            <HStack flex="50%" marginTop="5px">
              <Box className="material-icons" textColor="brandGreen.500">
                chair
              </Box>
              <Text>
                {advertisement.furnished ? "Furnished" : "Not furnished"}
              </Text>
            </HStack>
            <HStack flex="50%" marginTop="5px">
              <Box className="material-icons" textColor="brandGreen.500">
                local_parking
              </Box>
              <Text>
                {advertisement.parking ? "Parking avaliable" : "No parking"}
              </Text>
            </HStack>
          </Flex>
        </Card>
      </Box>
    </>
  );
};

export default AdvertisementDetails;
