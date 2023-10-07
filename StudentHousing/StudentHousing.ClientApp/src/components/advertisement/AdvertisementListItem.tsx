import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AdvertisementCardDto } from "../../models/advertisement/advertisementCardDto";
import AdvertisementService from "../../services/advertisementService";
import ImageService from "../../services/imageService";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { navbarButtonStyles } from "../../styles/navbarButtonStyles";
import { hoverAnimationStyles } from "../../styles/hoverAnimationStyles";

interface IAdvertisementListItemProps {
  advertisement: AdvertisementCardDto;
  refetch: Function;
}

const AdvertisementListItem: React.FunctionComponent<
  IAdvertisementListItemProps
> = ({ advertisement, refetch }) => {
  const navigate = useNavigate();
  const openDetails = () => {
    navigate("/details/" + advertisement.id);
  };

  const handleClick = async () => {
    await deleteAdvertisement();
    refetch();
  };

  const {
    isLoading,
    isError,
    error,
    mutateAsync: deleteAdvertisement,
  } = useMutation({
    mutationFn: async () => {
      return await AdvertisementService.remove(advertisement.id);
    },
  });

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
            maxWidth="700px"
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
              <LinkOverlay onClick={openDetails}></LinkOverlay>
              <Button
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
        </Card>
      </LinkBox>
      {isLoading && <Spinner />}
      {isError && !isLoading && error instanceof Error && (
        <ErrorAlert error={error} maxWidth="800px" />
      )}
    </>
  );
};

export default AdvertisementListItem;
