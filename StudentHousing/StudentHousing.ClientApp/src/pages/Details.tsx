import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  VStack,
  Image,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Details = () => {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        flexDirection="column"
      >
        <VStack minWidth="75%">
          <Breadcrumb
            marginY="10px"
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            width="100%"
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/housing">
                Housing
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link} to="/details">
                Details
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </VStack>
        <Box>
          <Image
            src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
            objectFit="cover"
          ></Image>
        </Box>
      </Flex>
    </>
  );
};
