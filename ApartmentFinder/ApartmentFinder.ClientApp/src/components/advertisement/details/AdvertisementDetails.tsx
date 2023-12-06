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
import { useState } from "react";
import { Advertisement } from "../../../models/advertisement/advertisement";
import ImageService from "../../../services/imageService";
import { detailsHeadingStyles } from "../../../styles/detailsHeadingStyles";
import AdvertiserInfo from "./AdvertiserInfo";
import { hoverAnimation2Styles } from "../../../styles/hoverAnimation2Styles";

interface IAdvertisementDetailsProps {
  advertisement: Advertisement;
  isLoggedIn: boolean;
}

const AdvertisementDetails: React.FunctionComponent<
  IAdvertisementDetailsProps
> = ({ advertisement, isLoggedIn }) => {
  let base64Images = advertisement.images.map((image) => {
    return ImageService.convertToBase64Image(image);
  });
  const [selectedImage, setSelectedImage] = useState(base64Images[0]);
  return (
    <>
      <Box width={{ base: "100%", lg: "85%", xl: "75%" }}>
        <Flex position="absolute">
          <Badge fontSize="1.1rem" fontWeight="500" variant="solid">
            {advertisement.categoryName}
          </Badge>
        </Flex>
        <Flex width="100%">
          <Flex width="100%" marginRight="20px" flexDirection="column">
            <Flex
              width="100%"
              overflow="hidden"
              height="420px"
              borderRadius="6px"
            >
              <Image
                objectFit="cover"
                minWidth="100%"
                minHeight="100%"
                src={selectedImage}
                alignSelf="center"
              ></Image>
            </Flex>
            {advertisement.images.length > 1 && (
              <Flex
                gap="5px"
                marginY="10px"
                flexDir="row"
                overflowX="auto"
                overflowY="hidden"
              >
                {base64Images?.map((image) => (
                  <Flex
                    flex="1 0 200px"
                    maxWidth="350px"
                    onClick={() => setSelectedImage(image)}
                    borderRadius="5px"
                    overflow="hidden"
                    border="3px solid gray"
                    height="120px"
                  >
                    <Image
                      src={image}
                      objectFit="cover"
                      minWidth="100%"
                      minHeight="100%"
                      alignSelf="center"
                      sx={hoverAnimation2Styles}
                    ></Image>
                  </Flex>
                ))}
              </Flex>
            )}
          </Flex>
          <AdvertiserInfo
            advertiserId={advertisement.advertiserId}
            advertisementId={advertisement.id}
            isLoggedIn={isLoggedIn}
          />
        </Flex>
        <Card
          variant="elevated"
          padding="20px"
          marginTop={advertisement.images.length > 1 ? "0px" : "20px"}
        >
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
