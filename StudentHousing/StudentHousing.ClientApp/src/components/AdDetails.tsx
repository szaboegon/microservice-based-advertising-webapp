import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Heading,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

interface IAdDetailsProps {}

const AdDetails: React.FunctionComponent<IAdDetailsProps> = (props) => {
  return (
    <>
      <Flex width="75%" marginY="20px" flexWrap="wrap">
        <Box width="50%" minWidth="600px">
          <Image
            border="4px"
            width="100%"
            height="auto"
            src="https://img.staticmb.com/mbcontent//images/uploads/2022/12/Most-Beautiful-House-in-the-World.jpg"
            objectFit="contain"
          ></Image>
          <Heading fontSize="2rem" textColor="gray.600">
            30000 Ft/month
          </Heading>
          <Heading fontSize="1.8rem" fontWeight="600" textColor="gray.600">
            Nagy János utca 11. /2.{" "}
          </Heading>
          <Heading fontSize="1.3rem" fontWeight="400" textColor="gray.600">
            1089 Budapest, XI. kerület
          </Heading>
          <Heading fontSize="1.3rem" fontWeight="400" textColor="gray.600">
            Pest vármegye
          </Heading>
        </Box>
        <TableContainer margin="40px" minWidth="400px">
          <Table width="600px">
            <Thead></Thead>
            <Tbody>
              <Tr>
                <Th>Number of Rooms:</Th>
                <Td>2.5</Td>
              </Tr>
              <Tr>
                <Th>Size</Th>
                <Td>70 m</Td>
              </Tr>
              <Tr>
                <Th>Is it furnished?</Th>
                <Td>Yes</Td>
              </Tr>
              <Tr>
                <Th>Is there parking available?</Th>
                <Td>No</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Box>
          <Heading fontSize="1.8rem" textColor="gray.600" marginTop="30px">
            Description
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
            porttitor eu,
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default AdDetails;
