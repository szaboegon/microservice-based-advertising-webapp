import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import districts from "../../../assets/literals/districts";
import regions from "../../../assets/literals/regions";
import { NewAdvertisementRequest } from "../../../models/requests/newAdvertisementRequest";
import { formErrorMessageStyles } from "../../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../../styles/formLabelStyles";
import { placeholderStyles } from "../../../styles/placeholderStyles";

interface IAddressStepProps {
  formValues: NewAdvertisementRequest;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementRequest>>;
  nextStep: () => void;
}

const AddressStep: React.FunctionComponent<IAddressStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<NewAdvertisementRequest>();

  const saveData = (data: NewAdvertisementRequest) => {
    setFormValues({ ...formValues, ...data });
    nextStep();
  };

  const city = watch("city");

  return (
    <>
      <form onSubmit={handleSubmit(saveData)}>
        <Flex
          height="420px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <FormControl isInvalid={!!errors.region}>
            <FormLabel sx={formLabelStyles} htmlFor="region">
              Region:
            </FormLabel>
            <Select
              {...register("region", {
                required: "This field is required",
              })}
              id="region"
              borderColor="gray.500"
              placeholder="Choose"
              size="lg"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
            {errors.region && (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.region.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <HStack width="100%" alignItems="start" justifyContent="center">
            <FormControl isInvalid={!!errors.city}>
              <FormLabel sx={formLabelStyles} htmlFor="city">
                City:
              </FormLabel>
              <Input
                {...register("city", {
                  required: "This field is required",
                  pattern: {
                    value:
                      /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$|^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$/,
                    message: "Invalid format",
                  },
                  maxLength: {
                    value: 30,
                    message: "City can be at most 30 characters long.",
                  },
                })}
                id="city"
                type="text"
                borderColor="gray.500"
                placeholder="Budapest"
                size="lg"
              ></Input>
              {errors.city && (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.city.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.postalCode}>
              <FormLabel sx={formLabelStyles} htmlFor="postalCode">
                Postal Code:
              </FormLabel>
              <Input
                {...register("postalCode", {
                  required: "This field is required",
                  maxLength: {
                    value: 4,
                    message: "Postal code should have a length of 4",
                  },
                  minLength: {
                    value: 4,
                    message: "Postal code should have a length of 4",
                  },
                })}
                id="postalCode"
                type="number"
                placeholder="1089"
                borderColor="gray.500"
                size="lg"
                width="100%"
              ></Input>
              {errors.postalCode && (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.postalCode.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </HStack>
          <FormControl isInvalid={!!errors.district}>
            <FormLabel sx={formLabelStyles} htmlFor="district">
              District (only required for Budapest):
            </FormLabel>
            <Select
              {...register("district", {
                required: {
                  value: city?.toUpperCase() == "BUDAPEST",
                  message: "This field is required if the city is Budapest",
                },
                disabled: city?.toUpperCase() != "BUDAPEST",
              })}
              id="district"
              borderColor="gray.500"
              placeholder="Choose"
              size="lg"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
            {errors.district && (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.district.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.streetName}>
            <FormLabel sx={formLabelStyles} htmlFor="streetName">
              Street name:
            </FormLabel>
            <Input
              {...register("streetName", {
                required: "This field is required",
                maxLength: {
                  value: 40,
                  message: "Street name should have a max length of 40",
                },
                pattern: {
                  value: /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9\s/.,-]+$/,
                  message: "Invalid format",
                },
              })}
              id="streetName"
              type="text"
              borderColor="gray.500"
              placeholder="Király St."
              size="lg"
            ></Input>
            {errors.streetName && (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.streetName.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <HStack width="100%" alignItems="start">
            <FormControl isInvalid={!!errors.streetNumber}>
              <FormLabel
                sx={formLabelStyles}
                htmlFor="streetNumber"
                alignSelf="start"
              >
                Street number:
              </FormLabel>
              <Input
                {...register("streetNumber", {
                  maxLength: {
                    value: 20,
                    message: "Street number should have a max length of 20",
                  },
                  pattern: {
                    value: /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9\s/.,-]+$/,
                    message: "Invalid format",
                  },
                })}
                id="streetNumber"
                type="text"
                borderColor="gray.500"
                size="lg"
              ></Input>
              {errors.streetNumber && (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.streetNumber.message}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.unitNumber}>
              <FormLabel
                sx={formLabelStyles}
                htmlFor="unitNumber"
                alignSelf="start"
              >
                Unit number:
              </FormLabel>
              <Input
                {...register("unitNumber", {
                  maxLength: {
                    value: 20,
                    message: "Unit number should have a max length of 20",
                  },
                  pattern: {
                    value: /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ0-9\s/.,-]+$/,
                    message: "Invalid format",
                  },
                })}
                id="unitNumber"
                type="text"
                borderColor="gray.500"
                maxLength={20}
                size="lg"
              ></Input>
              {errors.unitNumber && (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.unitNumber.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </Flex>
        <Flex alignItems="center" marginTop="40px" flexDirection="column">
          <Button
            size="lg"
            type="submit"
            width="350px"
            height="40px"
            bgColor="brandGreen.500"
            textColor="white"
            _hover={{ background: "brandGreen.700" }}
          >
            Next
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default AddressStep;
