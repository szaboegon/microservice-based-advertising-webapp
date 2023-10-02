import { Card, Flex, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
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

interface RelatedAdvertisementInfo {
  advertisementId: number | undefined;
  width?: any;
}

const RelatedAdvertisementInfo: React.FunctionComponent<
  RelatedAdvertisementInfo
> = ({ advertisementId, width }) => {
  return (
    <Card
      width={width}
      display={{ base: "none", xl: "flex" }}
      justifyContent="center"
      alignItems="center"
      variant="elevated"
      zIndex="2"
      boxShadow="-3px 3px 5px #d3d3d3"
    >
      <Text fontSize="1.1rem">Ad info will show up here</Text>
    </Card>
  );
};

export default RelatedAdvertisementInfo;
