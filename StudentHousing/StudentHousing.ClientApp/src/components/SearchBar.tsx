import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
  VStack,
  Checkbox,
  Button,
  Box,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberDecrementStepper,
  InputRightElement,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import * as React from "react";

interface ISearchBarProps {
  minWidth?: string;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({ minWidth }) => {
  return (
    <>
      <Flex
        backgroundColor="white"
        borderWidth="5px"
        borderColor="brandGreen.500"
        borderRadius="30px"
        paddingLeft="20px"
        minWidth={minWidth}
      >
        <form className="filterBar">
          <FormControl maxWidth="180px">
            <FormLabel mb="0px" mt="5px">
              Category
            </FormLabel>
            <Select placeholder="Choose" variant="flushed">
              <option value="apartment">Apartment</option>
              <option value="room">Room</option>
              <option value="house">House</option>
            </Select>
          </FormControl>
          <FormControl maxWidth="180px">
            <FormLabel mb="0px" mt="5px">
              City
            </FormLabel>
            <Input
              type="text"
              variant="flushed"
              placeholder="e.g. Budapest"
            ></Input>
          </FormControl>
          <FormControl maxWidth="110px">
            <FormLabel mb="0px" mt="5px">
              Rooms
            </FormLabel>
            <NumberInput max={20} min={1} variant="flushed">
              <NumberInputField placeholder="Number" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl maxWidth="200px">
            <FormLabel mb="0px" mt="5px">
              Size
            </FormLabel>
            <InputGroup>
              <NumberInput variant="flushed">
                <NumberInputField placeholder="min" />
              </NumberInput>
              <FormLabel alignSelf="end" fontSize="1.2rem">
                -
              </FormLabel>
              <NumberInput variant="flushed">
                <NumberInputField placeholder="max" />
              </NumberInput>
              <InputRightAddon children="m²" />
            </InputGroup>
          </FormControl>
          <FormControl maxWidth="250px">
            <FormLabel mb="0px" mt="5px">
              Price
            </FormLabel>
            <InputGroup>
              <NumberInput variant="flushed">
                <NumberInputField placeholder="min" />
              </NumberInput>
              <FormLabel alignSelf="end" fontSize="1.2rem">
                -
              </FormLabel>
              <NumberInput variant="flushed">
                <NumberInputField placeholder="max" />
              </NumberInput>
              <InputRightAddon children="Ft" />
            </InputGroup>
          </FormControl>
          <VStack alignItems="start" justifyContent="center">
            <Checkbox>Furnished</Checkbox>
            <Checkbox>Parking</Checkbox>
          </VStack>
          <Flex backgroundColor="brandGreen.500" borderRightRadius="15px">
            <Button
              type="submit"
              variant="link"
              textColor="white"
              height="100%"
              maxWidth="120px"
              minWidth="100px"
              leftIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default SearchBar;
