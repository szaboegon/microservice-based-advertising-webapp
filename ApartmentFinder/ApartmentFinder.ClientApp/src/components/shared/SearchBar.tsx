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
import { AdvertisementSearchParams } from "../../models/queryParams/advertisementSearchParams";

interface ISearchBarProps {
  minWidth?: string;
  existingSearchParams?: URLSearchParams;
  onSearchParamsChanged: (newParams: AdvertisementSearchParams) => void;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({
  minWidth,
  existingSearchParams,
  onSearchParamsChanged,
}) => {
  const initialFormValues: AdvertisementSearchParams = {
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
  const {
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm<AdvertisementSearchParams>();

  const submit = (data: AdvertisementSearchParams) => {
    onSearchParamsChanged(data);
  };

  useEffect(() => {
    let updatedState = { ...initialFormValues };
    for (const property in getValues()) {
      if (existingSearchParams?.has(property)) {
        updatedState[property as keyof AdvertisementSearchParams] =
          existingSearchParams.get(property)!;
        setValue(
          property as keyof AdvertisementSearchParams,
          existingSearchParams.get(property)!,
        );
      }
    }
  }, []);

  return (
    <>
      <Flex
        backgroundColor="white"
        borderWidth="4px"
        borderColor="brandGreen.500"
        borderRadius="30px"
        paddingLeft="20px"
        minWidth={minWidth}
      >
        <form className="filterBar" onSubmit={handleSubmit(submit)}>
          <FormControl maxWidth="140px">
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
          <FormControl maxWidth="140px">
            <FormLabel mb="0px" mt="5px" htmlFor="city">
              City
            </FormLabel>
            <Input
              id="city"
              {...register("city")}
              type="text"
              variant="flushed"
              placeholder="Budapest"
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
              placeholder="number"
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

          <Flex
            backgroundColor="brandGreen.500"
            borderRightRadius="20px"
            position="relative"
            left="2px"
            minHeight="50px"
          >
            <Button
              type="submit"
              variant="link"
              textColor="white"
              height="100%"
              width="110px"
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
