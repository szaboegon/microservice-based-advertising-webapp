import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Checkbox,
  Button,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchParamsFormData } from "../formInterfaces/searchParamsFormData";
import { SearchParams } from "../models/searchParams.model";

interface ISearchBarProps {
  minWidth?: string;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({ minWidth }) => {
  const navigate = useNavigate();
  const initialFormValues: SearchParamsFormData = {
    categoryName: "",
    city: "",
    numberOfRooms: "",
    minSize: "",
    maxSize: "",
    minMonthlyPrice: "",
    maxMonthlyPrice: "",
    furnished: "",
    parking: "",
  };
  const [searchParams, setSearchParams] = useSearchParams({});
  const [formValues, setFormValues] =
    useState<SearchParamsFormData>(initialFormValues);

  useEffect(() => {
    var updatedState = { ...initialFormValues };
    for (const property in formValues) {
      if (searchParams.has(property)) {
        updatedState[property as keyof SearchParamsFormData] =
          searchParams.get(property)!;
      }
    }

    setFormValues(updatedState);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    for (const property in formValues) {
      searchParams.delete(property);
      if (formValues[property as keyof SearchParamsFormData] != "") {
        searchParams.set(
          property,
          formValues[property as keyof SearchParamsFormData]
        );
      }
    }
    navigate("/search?" + searchParams, {});
  };
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
        <form className="filterBar" onSubmit={handleSubmit}>
          <FormControl maxWidth="180px">
            <FormLabel mb="0px" mt="5px" htmlFor="categoryName">
              Category
            </FormLabel>
            <Select
              id="categoryName"
              name="categoryName"
              value={formValues.categoryName}
              onChange={handleInputChange}
              placeholder="Choose"
              variant="flushed"
            >
              <option value="apartment">Apartment</option>
              <option value="room">Room</option>
              <option value="house">House</option>
            </Select>
          </FormControl>
          <FormControl maxWidth="180px">
            <FormLabel mb="0px" mt="5px" htmlFor="city">
              City
            </FormLabel>
            <Input
              id="city"
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
              type="text"
              variant="flushed"
              placeholder="e.g. Budapest"
            ></Input>
          </FormControl>
          <FormControl maxWidth="100px">
            <FormLabel mb="0px" mt="5px" htmlFor="numberOfRooms">
              Rooms
            </FormLabel>
            <Input
              id="numberOfRooms"
              name="numberOfRooms"
              value={formValues.numberOfRooms}
              onChange={handleInputChange}
              type="number"
              max={20}
              min={1}
              variant="flushed"
              placeholder="Number"
            />
          </FormControl>
          <FormControl maxWidth="150px">
            <FormLabel mb="0px" mt="5px" htmlFor="minSize">
              Size
            </FormLabel>
            <InputGroup>
              <Input
                id="minSize"
                name="minSize"
                value={formValues.minSize}
                onChange={handleInputChange}
                type="number"
                variant="flushed"
                placeholder="min"
              />
              <FormLabel alignSelf="end" fontSize="1.2rem">
                -
              </FormLabel>
              <Input
                id="maxSize"
                name="maxSize"
                value={formValues.maxSize}
                onChange={handleInputChange}
                type="number"
                variant="flushed"
                placeholder="max"
              />
              <InputRightAddon children="m²" />
            </InputGroup>
          </FormControl>
          <FormControl maxWidth="220px">
            <FormLabel mb="0px" mt="5px" htmlFor="minMonthlyPrice">
              Price
            </FormLabel>
            <InputGroup>
              <Input
                id="minMonthlyPrice"
                name="minMonthlyPrice"
                value={formValues.minMonthlyPrice}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="min"
              />
              <FormLabel alignSelf="end" fontSize="1.2rem">
                -
              </FormLabel>
              <Input
                id="maxMonthlyPrice"
                name="maxMonthlyPrice"
                value={formValues.maxMonthlyPrice}
                onChange={handleInputChange}
                variant="flushed"
                placeholder="max"
              />
              <InputRightAddon children="Ft" />
            </InputGroup>
          </FormControl>
          <FormControl maxWidth="100px">
            <FormLabel mb="0px" mt="5px" htmlFor="minMonthlyPrice">
              Furnished
            </FormLabel>
            <Select
              name="furnished"
              value={formValues.furnished}
              onChange={handleInputChange}
              variant="flushed"
              placeholder="Choose"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FormControl>
          <FormControl maxWidth="100px">
            <FormLabel mb="0px" mt="5px" htmlFor="minMonthlyPrice">
              Parking
            </FormLabel>
            <Select
              name="parking"
              value={formValues.parking}
              onChange={handleInputChange}
              variant="flushed"
              placeholder="Choose"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FormControl>

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
