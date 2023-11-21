import {
  Box,
  BoxProps,
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
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as React from "react";
import { useQuery } from "react-query";
import AdvertisementService from "../../services/advertisementService";
import { Advertisement } from "../../models/advertisement/advertisement";
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
  const [advertisement, setAdvertisement] = useState<Advertisement>();
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
    onSuccess: (data: Advertisement) => {
      setAdvertisement(data);
      const img = ImageService.convertToBase64Image(data.images[0]);
      setBase64Image(img);
    },
    refetchOnWindowFocus: false,
    enabled: !!advertisementId,
  });

  return (
    <Card
      flex={flex}
      height="100%"
      display={{ base: "none", xl: "flex" }}
      variant="elevated"
      zIndex="2"
      boxShadow="-3px 3px 5px #d3d3d3"
      alignItems="center"
      flexDir="column"
    >
      {advertisement && isSuccess ? (
        <Flex
          width="100%"
          height="100%"
          fontWeight="semibold"
          textColor="gray.600"
          flexDirection="column"
        >
          <Flex
            width="100%"
            overflow="hidden"
            borderWidth="8px"
            borderRadius="6px"
            borderColor="white"
            flex="0 0 420px"
          >
            <Image
              objectFit="cover"
              minWidth="100%"
              minHeight="100%"
              src={base64Image}
            ></Image>
          </Flex>
          <HStack flex="0 0 50px" fontSize="1.2rem" padding="10px">
            <Box className="material-icons" textColor="brandGreen.500">
              location_on
            </Box>
            <Text>
              {advertisement.city}
              {advertisement.city.toUpperCase() == "BUDAPEST"
                ? " " + advertisement.district + ", "
                : ", "}
              {advertisement.streetName}
            </Text>
          </HStack>
          <Box
            overflowY="scroll"
            marginY="10px"
            overflowX="hidden"
            flex="1"
            width="100%"
          >
            <Text textAlign="justify" marginX="50px">
              {advertisement.description}
            </Text>
          </Box>
          <Box flex="0 0 80px">
            <Button
              margin="15px"
              width="130px"
              as={Link}
              to={`/details/${advertisement.id}`}
              sx={navbarButtonStyles}
              leftIcon={
                <Box className="material-icons" textColor="white">
                  wysiwyg
                </Box>
              }
            >
              To Details
            </Button>
          </Box>
        </Flex>
      ) : (
        <Text
          alignItems="center"
          height="100%"
          display="flex"
          fontSize="1.1rem"
          textAlign="center"
          padding="10px"
        >
          {advertisementId
            ? "There was a problem finding the related advertisement, it was probably deleted by the advertiser."
            : "Ad info will show up here"}
        </Text>
      )}
    </Card>
  );
};

export default RelatedAdvertisementInfo;
