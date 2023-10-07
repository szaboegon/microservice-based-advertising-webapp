import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../models/user";
import { PROFILE_CARD_WIDTH } from "../../assets/literals/constants";

interface IProfileCardProps {
  user: User;
}

const ProfileCard: React.FunctionComponent<IProfileCardProps> = ({ user }) => {
  return (
    <>
      <Card
        justifyContent="center"
        paddingX="15px"
        align="center"
        variant="elevated"
        height="350px"
        width={PROFILE_CARD_WIDTH}
        alignItems="center"
      >
        <Avatar name={`${user.firstName} ${user.lastName}`} size="2xl" />
        <Text textColor="gray.600" font fontSize="1.5rem" marginBottom="1rem">
          {user.firstName + " " + user.lastName}
        </Text>
        <Divider
          orientation="horizontal"
          borderColor="gray.600"
          borderWidth="1px"
          borderRadius="10"
          marginY="8px"
        />
        <HStack alignItems="center" width="100%">
          <Box className="material-icons" textColor="brandGreen.500">
            person
          </Box>
          <Text fontSize="1.2rem" fontWeight="500" textColor="gray.600">
            {user.userName}
          </Text>
        </HStack>
        <HStack alignItems="center" width="100%">
          <Box className="material-icons" textColor="brandGreen.500">
            <span className="material-symbols-outlined">alternate_email</span>
          </Box>
          <Text fontSize="1.2rem" fontWeight="500" textColor="gray.600">
            {user.email}
          </Text>
        </HStack>
      </Card>
    </>
  );
};

export default ProfileCard;
