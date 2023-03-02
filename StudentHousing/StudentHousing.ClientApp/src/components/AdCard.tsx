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
} from "@chakra-ui/react";
import * as React from "react";

interface IAdCardProps {}

const AdCard: React.FunctionComponent<IAdCardProps> = (props) => {
  return (
    <>
      <LinkBox>
        <Card
          maxWidth="md"
          variant="filled"
          margin="12px"
          borderBottom="4px"
          borderColor="brandYellow.500"
        >
          <CardHeader padding="0px" position="relative">
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
                Apartment
              </Text>
            </Flex>
            <Image
              src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
              objectFit="cover"
            ></Image>
          </CardHeader>
          <CardBody>
            <HStack>
              <Heading
                alignSelf="end"
                fontSize="1.5rem"
                textColor="brandGreen.500"
              >
                300000
              </Heading>
              <Heading fontSize="1.0rem" paddingTop="5px">
                Ft/month
              </Heading>
            </HStack>
            <LinkOverlay href="/"></LinkOverlay>
            <VStack alignItems="space-between">
              <Text fontSize="1.2rem" fontWeight="600">
                Üllői út 86.
              </Text>
              <Text
                fontSize="1.2rem"
                fontWeight="600"
                className="card-text"
                textColor="gray.500"
              >
                1089 Budapest
              </Text>
              <HStack justifyContent="space-between">
                <Text fontSize="1.1rem" fontWeight="600">
                  3 rooms
                </Text>
                <Text fontSize="1.1rem" fontWeight="600">
                  150 m²
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </LinkBox>
    </>
  );
};

export default AdCard;
