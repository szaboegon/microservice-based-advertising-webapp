import {
  Flex,
  Card,
  CardBody,
  CardHeader,
  Image,
  LinkBox,
  LinkOverlay,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AdvertisementCardDto } from "../../models/advertisement/advertisementCardDto";
import ImageService from "../../services/imageService";
import { hoverAnimationStyles } from "../../styles/hoverAnimationStyles";

interface IAdvertisementCardProps {
  advertisement: AdvertisementCardDto;
}

const AdvertisementCard: React.FunctionComponent<IAdvertisementCardProps> = ({
  advertisement,
}) => {
  const navigate = useNavigate();
  const openDetails = () => {
    navigate("/details/" + advertisement.id);
  };

  let base64Image = ImageService.convertToBase64Image(advertisement.image);

  return (
    <>
      <LinkBox>
        <Card
          width="100%"
          variant="elevated"
          borderBottom="4px"
          borderColor="brandGreen.300"
          borderRadius="8px"
          height="380"
          sx={hoverAnimationStyles}
        >
          <CardHeader
            height="250px"
            padding="0px"
            position="relative"
            overflow="hidden"
            borderRadius="8px"
          >
            <Flex position="absolute">
              <Badge
                fontSize="1rem"
                fontWeight="500"
                variant="solid"
                backgroundColor="gray.400"
              >
                {advertisement.categoryName}
              </Badge>
            </Flex>
            <Flex justifyContent="center" alignItems="center" height="100%">
              <Image
                src={base64Image}
                width="100%"
                height="100%"
                objectFit="cover"
              ></Image>
            </Flex>
          </CardHeader>
          <CardBody>
            <HStack gap="3px">
              <Text
                fontSize="1.2rem"
                textColor="brandGreen.400"
                fontWeight="600"
              >
                {"HUF " + advertisement.monthlyPrice}
              </Text>
              <Text fontSize="1.2rem" textColor="gray.600" fontWeight="600">
                /month
              </Text>
            </HStack>
            <LinkOverlay onClick={openDetails}></LinkOverlay>
            <VStack alignItems="space-between">
              <HStack justifyContent="start" textColor="gray.600">
                <Text fontSize="1.1rem" fontWeight="600">
                  {advertisement.numberOfRooms == 1
                    ? advertisement.numberOfRooms + " " + "room"
                    : advertisement.numberOfRooms + " " + "rooms"}
                </Text>

                <Box
                  className="material-icons"
                  fontSize="0.4rem"
                  marginTop="2px"
                >
                  fiber_manual_record
                </Box>
                <Text fontSize="1.1rem" fontWeight="600">
                  {advertisement.size} m²
                </Text>
              </HStack>
              <HStack>
                <Text
                  fontSize="1.05rem"
                  fontWeight="600"
                  className="card-text"
                  textColor="gray.600"
                >
                  {advertisement.city.toUpperCase() == "BUDAPEST"
                    ? advertisement.district + " " + advertisement.city + ", "
                    : advertisement.city + ", "}
                </Text>
                <Text fontSize="1.05rem" fontWeight="600" textColor="gray.600">
                  {advertisement.streetName}
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
