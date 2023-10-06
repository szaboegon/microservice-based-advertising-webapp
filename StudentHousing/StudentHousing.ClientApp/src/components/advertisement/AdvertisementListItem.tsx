import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
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
import { useNavigate } from "react-router-dom";
import { AdvertisementCardDto } from "../../models/advertisement/advertisementCardDto";
import AdvertisementService from "../../services/advertisementService";
import ImageService from "../../services/imageService";
import { ErrorAlert } from "../alerts/ErrorAlert";

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
      <LinkBox width="100%" paddingX="20px" borderBottom="1px">
        <Flex
          direction="row"
          overflow="hidden"
          height="200px"
          width="100%"
          borderRadius="8px"
        >
          <Image src={base64Image} maxWidth="700px" objectFit="cover"></Image>
          <LinkOverlay onClick={openDetails}></LinkOverlay>
          <CardBody>
            <HStack justifyContent="space-between">
              <Box>
                <HStack>
                  <Heading
                    alignSelf="end"
                    fontSize="1.7rem"
                    textColor="brandGreen.500"
                  >
                    {advertisement.monthlyPrice}
                  </Heading>
                  <Heading fontSize="1.2rem" paddingTop="5px">
                    Ft/month
                  </Heading>
                </HStack>
                <Heading
                  alignSelf="end"
                  fontSize="1.2rem"
                  textColor="brandGreen.500"
                ></Heading>
                <Text fontSize="1.3rem" fontWeight="600">
                  {advertisement.streetName + " " + advertisement.streetNumber}
                </Text>
                <Text
                  fontSize="1.1rem"
                  fontWeight="600"
                  className="card-text"
                  textColor="gray.500"
                >
                  {advertisement.city.toUpperCase() == "BUDAPEST"
                    ? advertisement.district + " " + advertisement.city
                    : advertisement.city}
                </Text>

                <Text fontSize="1.1rem" fontWeight="600">
                  {"Posted on: " + formatDate(advertisement.uploadDate)}
                </Text>
              </Box>
              <IconButton
                colorScheme="red"
                aria-label="Delete Advertisement"
                fontSize="20px"
                icon={<DeleteIcon />}
                onClick={handleClick}
              ></IconButton>
            </HStack>
          </CardBody>
        </Flex>
      </LinkBox>
      {isLoading && <Spinner />}
      {isError && !isLoading && error instanceof Error && (
        <ErrorAlert error={error} maxWidth="800px" />
      )}
    </>
  );
};

export default AdvertisementListItem;
