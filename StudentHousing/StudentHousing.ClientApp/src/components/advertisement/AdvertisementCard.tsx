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
  Badge,
  Box,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AdvertisementCardDto } from "../../models/advertisement/advertisementCardDto";
import ImageService from "../../services/imageService";

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
      <LinkBox
        display="flex"
        flexShrink="0"
        flexGrow="1"
        flexBasis={{
          base: "70%",
          sm: "45%",
          md: "30%",
          xl: "27%",
          "2xl": "23%",
        }}
        maxWidth={{
          base: "70%",
          sm: "45%",
          md: "30%",
          xl: "27%",
          "2xl": "23%",
        }}
      >
        <Card
          width="100%"
          variant="elevated"
          borderBottom="4px"
          borderColor="brandGreen.300"
          borderRadius="8px"
          height="380"
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
                //src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
              ></Image>
            </Flex>
          </CardHeader>
          <CardBody>
            <HStack>
              <Heading
                alignSelf="end"
                fontSize="1.4rem"
                textColor="brandGreen.400"
              >
                {"HUF " + advertisement.monthlyPrice}
              </Heading>
              <Heading fontSize="1.0rem" paddingTop="5px" textColor="gray.600">
                /month
              </Heading>
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
