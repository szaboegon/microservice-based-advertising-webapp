import { Flex, Image, Box, Heading, Card } from "@chakra-ui/react";
import BannerImg from "../assets/bannerimg.jpg";
import AdvertisementCard from "../components/AdvertisementCard";
import SearchBar from "../components/SearchBar";

export const Home = () => {
  return (
    <>
      <Flex
        height="600px"
        overflow="hidden"
        position="relative"
        justifyContent="center"
      >
        <Image
          src={BannerImg}
          alignSelf="end"
          height="auto"
          minWidth="2000px"
          placeholder="Image by benzoix</a> on Freepik"
        ></Image>
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          width="100%"
          height="100%"
        >
          <Heading textColor="white" size="3xl" textAlign="center">
            Apartment finding made easy
          </Heading>
          <Heading
            textColor="brandYellow.500"
            size="2xl"
            marginBottom="50px"
            textAlign="center"
          >
            For Students
          </Heading>
          <SearchBar minWidth="70%"></SearchBar>
        </Flex>
      </Flex>
      <Heading marginY="60px" textAlign="center" textColor="gray.500">
        Recent Advertisements
      </Heading>
      <Flex margin="50px" flexWrap="wrap" justifyContent="center"></Flex>
    </>
  );
};
