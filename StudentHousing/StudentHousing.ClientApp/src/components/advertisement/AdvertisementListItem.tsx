import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
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
import { AdvertisementListItemData } from "../../models/advertisement/advertisementListItemData";
import AdvertisementService from "../../services/AdvertisementService";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { SuccessAlert } from "../alerts/SuccessAlert";

interface IAdvertisementListItemProps {
  advertisement: AdvertisementListItemData;
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
    isSuccess,
    isLoading,
    isError,
    error,
    mutateAsync: deleteAdvertisement,
  } = useMutation({
    mutationFn: async () => {
      return await AdvertisementService.remove(advertisement.id);
    },
  });

  var base64Image = "data:image/png;base64," + advertisement.image;
  return (
    <>
      <Flex
        direction="column"
        width="800px"
        justifyContent="center"
        alignItems="center"
      >
        <LinkBox>
          <Card
            padding="10px"
            direction="row"
            overflow="hidden"
            variant="filled"
            height="200px"
            width="800px"
          >
            <CardHeader
              width="300px"
              padding="0px"
              position="relative"
              overflow="hidden"
            >
              <Flex
                backgroundColor="brandYellow.700"
                position="absolute"
                width="40%"
                height="13%"
                justifyContent="center"
                alignItems="center"
                borderRightRadius="25px"
              >
                <Text fontSize="1.2rem" fontWeight="600" textColor="white">
                  {advertisement.categoryName.charAt(0).toUpperCase() +
                    advertisement.categoryName.slice(1)}
                </Text>
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Image
                  src={base64Image}
                  minWidth="100%"
                  minHeight="100%"
                  //src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
                ></Image>
              </Flex>
            </CardHeader>
            <LinkOverlay onClick={openDetails}></LinkOverlay>
            <CardBody>
              <Heading>
                {advertisement.postalCode + " " + advertisement.city}
              </Heading>
              <IconButton
                colorScheme="red"
                aria-label="Delete Advertisement"
                fontSize="20px"
                icon={<DeleteIcon />}
                onClick={handleClick}
              ></IconButton>
            </CardBody>
          </Card>
        </LinkBox>
        {isLoading && <Spinner />}
        {isError && error instanceof Error && (
          <ErrorAlert error={error} maxWidth="800px" />
        )}
      </Flex>
    </>
  );
};

export default AdvertisementListItem;
