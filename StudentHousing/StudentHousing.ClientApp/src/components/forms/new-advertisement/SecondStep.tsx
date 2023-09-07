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
import { NewAdvertisementFormData } from "../../../models/formInterfaces/newAdvertisementFormData";
import { formErrorMessageStyles } from "../../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../../styles/formLabelStyles";
import { placeholderStyles } from "../../../styles/placeholderStyles";

interface ISecondStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  nextStep: () => void;
}

const SecondStep: React.FunctionComponent<ISecondStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<NewAdvertisementFormData>();

  const city = watch("city");

  const saveData = (data: NewAdvertisementFormData) => {
    setFormValues({ ...formValues, ...data });
    nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(saveData)}>
        <Flex
          height="450px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
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
              borderColor="brandYellow.800"
              placeholder="Choose"
              size="lg"
            >
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
            {errors.region ? (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.region.message}
              </FormErrorMessage>
            ) : (
              <Box sx={placeholderStyles}>Placeholder text</Box>
            )}
          </FormControl>
          <HStack width="100%" justifyContent="center">
            <VStack width="50%">
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
                  borderColor="brandYellow.800"
                  placeholder="e.g. Budapest"
                  size="lg"
                ></Input>
                {errors.city ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.city.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
                )}
              </FormControl>
            </VStack>
            <VStack width="50%">
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
                  placeholder="e.g. 1089"
                  borderColor="brandYellow.800"
                  size="lg"
                  width="100%"
                ></Input>
                {errors.postalCode ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.postalCode.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
                )}
              </FormControl>
            </VStack>
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
              borderColor="brandYellow.800"
              placeholder="Choose"
              size="lg"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
            {errors.district ? (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.district.message}
              </FormErrorMessage>
            ) : (
              <Box sx={placeholderStyles}>Placeholder text</Box>
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
              borderColor="brandYellow.800"
              placeholder="e.g. Király St."
              size="lg"
            ></Input>
            {errors.streetName ? (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.streetName.message}
              </FormErrorMessage>
            ) : (
              <Box sx={placeholderStyles}>Placeholder text</Box>
            )}
          </FormControl>
          <HStack width="100%">
            <VStack width="50%">
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
                    required: "This field is required",
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
                  borderColor="brandYellow.800"
                  size="lg"
                ></Input>
                {errors.streetNumber ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.streetNumber.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
                )}
              </FormControl>
            </VStack>
            <VStack width="50%">
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
                  borderColor="brandYellow.800"
                  maxLength={20}
                  size="lg"
                ></Input>
                {errors.unitNumber ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.unitNumber.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
                )}
              </FormControl>
            </VStack>
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

export default SecondStep;
