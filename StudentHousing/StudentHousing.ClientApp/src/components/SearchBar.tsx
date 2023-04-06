import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchParamsFormData } from "../formInterfaces/searchParamsFormData";

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

  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm<SearchParamsFormData>();

  const submit = (data: SearchParamsFormData) => {
    for (const property in getValues()) {
      setValue(
        property as keyof SearchParamsFormData,
        data[property as keyof SearchParamsFormData]
      );
      searchParams.delete(property);
      if (data[property as keyof SearchParamsFormData] != "") {
        searchParams.set(
          property as keyof SearchParamsFormData,
          data[property as keyof SearchParamsFormData]
        );
      }
    }
    navigate("/search?" + searchParams, {});
  };

  useEffect(() => {
    var updatedState = { ...initialFormValues };
    for (const property in getValues()) {
      if (searchParams.has(property)) {
        updatedState[property as keyof SearchParamsFormData] =
          searchParams.get(property)!;
        setValue(
          property as keyof SearchParamsFormData,
          searchParams.get(property)!
        );
      }
    }
  }, []);

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
        <form className="filterBar" onSubmit={handleSubmit(submit)}>
          <FormControl maxWidth="180px">
            <FormLabel mb="0px" mt="5px" htmlFor="categoryName">
              Category
            </FormLabel>
            <Select
              id="categoryName"
              {...register("categoryName")}
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
              {...register("city")}
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
              {...register("numberOfRooms")}
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
                {...register("minSize")}
                type="number"
                variant="flushed"
                placeholder="min"
              />
              <FormLabel alignSelf="end" fontSize="1.2rem">
                -
              </FormLabel>
              <Input
                id="maxSize"
                {...register("maxSize")}
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
                {...register("minMonthlyPrice")}
                variant="flushed"
                placeholder="min"
              />
              <FormLabel alignSelf="end" fontSize="1.2rem">
                -
              </FormLabel>
              <Input
                id="maxMonthlyPrice"
                {...register("maxMonthlyPrice")}
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
              {...register("furnished")}
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
              {...register("parking")}
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
