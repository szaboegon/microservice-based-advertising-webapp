import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import * as React from "react";
import { User } from "../../models/user";
import { useQuery } from "react-query";
import MessagingService from "../../services/messagingService";
import ChatTab from "./ChatTab";
import { AxiosError } from "axios";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { WarningAlert } from "../alerts/WarningAlert";
import UserService from "../../services/userService";
import { NAVBAR_HEIGHT } from "../../assets/literals/constants";
import { AdvertisementCardDto } from "../../models/advertisement/advertisementCardDto";
import AdvertisementService from "../../services/advertisementService";
import { AdvertisementDetailsDto } from "../../models/advertisement/advertisementDetailsDto";
import ImageService from "../../services/imageService";
import { Link } from "react-router-dom";
import { navbarButtonStyles } from "../../styles/navbarButtonStyles";

interface RelatedAdvertisementInfo {
  advertisementId: number | undefined;
  flex?: any;
}

const RelatedAdvertisementInfo: React.FunctionComponent<
  RelatedAdvertisementInfo
> = ({ advertisementId, flex }) => {
  const [advertisement, setAdvertisement] = useState<AdvertisementDetailsDto>();
  const [base64Image, setBase64Image] = useState<string>();

  const {
    isSuccess: isSuccess,
    isLoading: isLoading,
    isError: isError,
    isRefetching: isRefetching,
  } = useQuery({
    queryKey: ["relatedAdvertisement", advertisementId],
    queryFn: async () => {
      if (!advertisementId) return;
      return await AdvertisementService.findById(advertisementId);
    },
    onSuccess: (data: AdvertisementDetailsDto) => {
      setAdvertisement(data);
      const img = ImageService.convertToBase64Image(data.image);
      setBase64Image(img);
    },
    refetchOnWindowFocus: false,
    enabled: !!advertisementId,
  });

  return (
    <Card
      flex={flex}
      display={{ base: "none", xl: "flex" }}
      variant="elevated"
      zIndex="2"
      boxShadow="-3px 3px 5px #d3d3d3"
      alignItems="center"
    >
      {advertisement && isSuccess ? (
        <Flex
          width="100%"
          flexWrap="wrap"
          fontSize="1.1rem"
          fontWeight="semibold"
          textColor="gray.600"
          justifyContent="center"
        >
          <Flex
            width="100%"
            overflow="hidden"
            height="420px"
            borderWidth="8px"
            borderRadius="6px"
            borderColor="white"
          >
            <Image
              objectFit="cover"
              minWidth="100%"
              minHeight="100%"
              src={base64Image}
            ></Image>
          </Flex>
          <Button
            width="130px"
            as={Link}
            to={`/details/${advertisement.id}`}
            aria-label="Register"
            sx={navbarButtonStyles}
            leftIcon={
              <Box className="material-icons" textColor="white">
                wysiwyg
              </Box>
            }
          >
            To Details
          </Button>
        </Flex>
      ) : (
        <Text
          alignItems="center"
          height="100%"
          display="flex"
          fontSize="1.1rem"
        >
          Ad info will show up here
        </Text>
      )}
    </Card>
  );
};

export default RelatedAdvertisementInfo;
