import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  VStack,
  HStack,
  Text,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AdvertisementCardData } from "../models/advertisementCardData.";

interface IAdvertisementCardProps {
  advertisement: AdvertisementCardData;
}

const AdvertisementCard: React.FunctionComponent<IAdvertisementCardProps> = ({
  advertisement,
}) => {
  const navigate = useNavigate();
  const openDetails = () => {
    navigate("/details/" + advertisement.id);
  };

  var base64Image = "data:image/png;base64," + advertisement.image;

  return (
    <>
      <LinkBox>
        <Card
          width="410px"
          variant="filled"
          margin="12px"
          borderBottom="4px"
          borderColor="brandYellow.500"
        >
          <CardHeader
            height="280px"
            padding="0px"
            position="relative"
            overflow="hidden"
          >
            <Flex
              backgroundColor="brandYellow.700"
              position="absolute"
              width="25%"
              height="10%"
              justifyContent="center"
              alignItems="center"
              borderRightRadius="25px"
            >
              <Text fontSize="1.2rem" fontWeight="600" textColor="white">
                {advertisement.categoryName.charAt(0).toUpperCase() +
                  advertisement.categoryName.slice(1)}
              </Text>
            </Flex>
            <Image
              src={base64Image}
              //src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
            ></Image>
          </CardHeader>
          <CardBody>
            <HStack>
              <Heading
                alignSelf="end"
                fontSize="1.5rem"
                textColor="brandGreen.500"
              >
                {advertisement.monthlyPrice}
              </Heading>
              <Heading fontSize="1.0rem" paddingTop="5px">
                Ft/month
              </Heading>
            </HStack>
            <LinkOverlay onClick={openDetails}></LinkOverlay>
            <VStack alignItems="space-between">
              <Text fontSize="1.2rem" fontWeight="600">
                {advertisement.streetName + " " + advertisement.streetNumber}
              </Text>
              <Text
                fontSize="1.2rem"
                fontWeight="600"
                className="card-text"
                textColor="gray.500"
              >
                {advertisement.district
                  ? advertisement.district + " " + advertisement.city
                  : advertisement.city}
              </Text>
              <HStack justifyContent="space-between">
                <Text fontSize="1.1rem" fontWeight="600">
                  {advertisement.numberOfRooms == 1
                    ? advertisement.numberOfRooms + " " + "room"
                    : advertisement.numberOfRooms + " " + "rooms"}
                </Text>
                <Text fontSize="1.1rem" fontWeight="600">
                  {advertisement.size} m²
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </LinkBox>
    </>
  );
};

export default AdvertisementCard;