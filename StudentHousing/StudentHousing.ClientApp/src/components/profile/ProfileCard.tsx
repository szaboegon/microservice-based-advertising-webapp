import {
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { User } from "../../models/user";
import ProfilePic from "../../assets/images/profilepic.jpg";

interface IProfileCardProps {
  user: User;
}

const ProfileCard: React.FunctionComponent<IProfileCardProps> = ({ user }) => {
  return (
    <>
      <Card align="center" variant="filled" padding="1%" width="100%">
        <Box
          border="4px"
          borderRadius="100%"
          borderColor="brandGreen.600"
          overflow="hidden"
          maxWidth="200px"
        >
          <Image width="100%" height="auto" src={ProfilePic}></Image>
        </Box>
        <Heading textColor="brandGreen.700" marginBottom="1rem">
          {user.firstName + " " + user.lastName}
        </Heading>
        <Text fontSize="1.2rem" fontWeight="500" textColor="gray.600">
          Username: {user.userName}
        </Text>
        <Text fontSize="1.2rem" fontWeight="500" textColor="gray.600">
          Email: {user.email}
        </Text>
      </Card>
    </>
  );
};

export default ProfileCard;
