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
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";
import { formErrorMessageStyles } from "../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../styles/formLabelStyles";
import { placeholderStyles } from "../../styles/placeholderStyles";

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
              <option value="Bács-Kiskun">Bács-Kiskun</option>
              <option value="Baranya">Baranya</option>
              <option value="Borsod-Abaúj-Zemplén">Borsod-Abaúj-Zemplén</option>
              <option value="Csongrád-Csanád">Csongrád-Csanád</option>
              <option value="Fejér">Fejér</option>
              <option value="Győr-Moson-Sopron">Győr-Moson-Sopron</option>
              <option value="Hajdú-Bihar">Hajdú-Bihar</option>
              <option value="Heves">Heves</option>
              <option value="Jász-Nagykun-Szolnok">Jász-Nagykun-Szolnok</option>
              <option value="Komárom-Esztergom">Komárom-Esztergom</option>
              <option value="Nógrád">Nógrád</option>
              <option value="Pest">Pest</option>
              <option value="Somogy">Somogy</option>
              <option value="Szabolcs-Szatmár-Bereg">
                Szabolcs-Szatmár-Bereg
              </option>
              <option value="Tolna">Tolna</option>
              <option value="Vas">Vas</option>
              <option value="Veszprém">Veszprém</option>
              <option value="Zala">Zala</option>
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
                      message: "Postal code should have a lenght of 4",
                    },
                    minLength: {
                      value: 4,
                      message: "Postal code should have a lenght of 4",
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
            <Input
              {...register("district", {
                maxLength: {
                  value: 6,
                  message: "District should have a max lenght of 6",
                },
                required: {
                  value: city?.toUpperCase() == "BUDAPEST",
                  message: "This field is required if the city is Budapest",
                },
                disabled: city?.toUpperCase() != "BUDAPEST",
              })}
              id="district"
              type="text"
              borderColor="brandYellow.800"
              placeholder="e.g. XI."
              size="lg"
            ></Input>
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
                  message: "Street name should have a max lenght of 40",
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
                      message: "Street number should have a max lenght of 20",
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
                      message: "Unit number should have a max lenght of 20",
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
