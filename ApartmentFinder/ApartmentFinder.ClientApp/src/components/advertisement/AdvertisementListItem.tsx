import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AdvertisementInfo } from "../../models/advertisement/advertisementInfo";
import ImageService from "../../services/imageService";
import { hoverAnimationStyles } from "../../styles/hoverAnimationStyles";

interface IAdvertisementListItemProps {
  advertisement: AdvertisementInfo;
  requestDelete: (id: number) => void;
}

const AdvertisementListItem: React.FunctionComponent<
  IAdvertisementListItemProps
> = ({ advertisement, requestDelete }) => {
  const navigate = useNavigate();
  const openDetails = () => {
    navigate("/details/" + advertisement.id);
  };

  const handleClick = async () => {
    requestDelete(advertisement.id);
  };

  function formatDate(dateString: string) {
    const validString = dateString.replace(/T[0-9:.]+/, "");
    const validDate = new Date(validString);
    return validDate.toDateString();
  }

  let base64Image = ImageService.convertToBase64Image(advertisement.image);
  return (
    <>
      <LinkBox width="100%" zIndex="5">
        <Card
          variant="elevated"
          direction="row"
          height="180px"
          width="100%"
          borderRadius="8px"
          sx={hoverAnimationStyles}
        >
          <Image
            src={base64Image}
            width="300px"
            objectFit="cover"
            borderRadius="8px"
          ></Image>
          <CardBody>
            <Flex
              flexDirection="column"
              height="100%"
              fontSize="1.1rem"
              fontWeight="semibold"
              textColor="gray.600"
              justifyContent="space-evenly"
              position="relative"
            >
              <HStack>
                <Box className="material-icons" textColor="brandGreen.500">
                  location_on
                </Box>
                <Text>
                  {advertisement.city},{" "}
                  {advertisement.city.toUpperCase() == "BUDAPEST"
                    ? advertisement.district
                    : ""}{" "}
                  {advertisement.streetName} {advertisement.streetNumber}
                </Text>
              </HStack>
              <HStack>
                <Box className="material-icons" textColor="brandGreen.500">
                  calendar_month
                </Box>
                <Text>{formatDate(advertisement.uploadDate)}</Text>
              </HStack>
              <HStack>
                <Box className="material-icons" textColor="brandGreen.500">
                  paid
                </Box>
                <Text>{advertisement.monthlyPrice} Ft/month</Text>
              </HStack>
              <Button
                zIndex="1"
                position="absolute"
                bottom="5px"
                colorScheme="red"
                height="45px"
                aria-label="Delete Advertisement"
                onClick={handleClick}
                size="sm"
                alignSelf="end"
                leftIcon={
                  <Box className="material-icons" textColor="white">
                    delete_forever
                  </Box>
                }
              >
                Delete
              </Button>
            </Flex>
          </CardBody>
          <LinkOverlay onClick={openDetails}></LinkOverlay>
        </Card>
      </LinkBox>
    </>
  );
};

export default AdvertisementListItem;
