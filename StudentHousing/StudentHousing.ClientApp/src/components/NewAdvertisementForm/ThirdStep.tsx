import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";
import { formErrorMessageStyles } from "../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../styles/formLabelStyles";
import { placeholderStyles } from "../../styles/placeholderStyles";

interface IThirdStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  nextStep: () => void;
}

const ThirdStep: React.FunctionComponent<IThirdStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const [isRoom, setIsRoom] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewAdvertisementFormData>();

  const saveData = (data: NewAdvertisementFormData) => {
    setFormValues({ ...formValues, ...data });
    nextStep();
  };

  React.useEffect(() => {
    if (formValues.categoryName.toUpperCase() == "ROOM") {
      setIsRoom(true);
    } else {
      setIsRoom(false);
    }
  }, [formValues.categoryName]);

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
          <HStack width="100%">
            <VStack width="50%">
              <FormControl isInvalid={!!errors.numberOfRooms}>
                <FormLabel
                  sx={formLabelStyles}
                  htmlFor="numberOfRooms"
                  alignSelf="start"
                >
                  Number of rooms:
                </FormLabel>
                <Input
                  {...register("numberOfRooms", {
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "Number of rooms must be at least 1",
                    },
                    max: {
                      value: 100,
                      message: "Number of rooms must be 100 at maximum",
                    },
                    pattern: {
                      value: /^[0-9]+$|^[0-9]+.[0,5]$/,
                      message: "Number of rooms must be rounded to .5",
                    },
                    disabled: isRoom,
                  })}
                  id="numberOfRooms"
                  type="number"
                  borderColor="brandYellow.800"
                  size="lg"
                  width="100%"
                ></Input>
                {errors.numberOfRooms ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.numberOfRooms.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
                )}
              </FormControl>
            </VStack>
            <VStack width="50%">
              <FormControl isInvalid={!!errors.size}>
                <FormLabel sx={formLabelStyles} htmlFor="size">
                  Size:
                </FormLabel>
                <InputGroup>
                  <Input
                    {...register("size", {
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "Size must be at least 1",
                      },
                      pattern: {
                        value: /^[0-9]+$|^[0-9]+.[0-9]$/,
                        message: "Size should be rounded to .1",
                      },
                    })}
                    id="size"
                    type="number"
                    width="100%"
                    borderColor="brandYellow.800"
                    size="lg"
                  />
                  <InputRightAddon
                    children="m²"
                    fontSize="1.2rem"
                    backgroundColor="white"
                    border="0px"
                    fontWeight="600"
                    textColor="brandGreen.700"
                  />
                </InputGroup>
                {errors.size ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.size.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
                )}
              </FormControl>
            </VStack>
          </HStack>
          <FormControl isInvalid={!!errors.monthlyPrice}>
            <FormLabel sx={formLabelStyles} htmlFor="monthlyPrice">
              Monthly Price:
            </FormLabel>
            <InputGroup>
              <Input
                {...register("monthlyPrice", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Monthly price must be at least 1",
                  },
                })}
                id="monthlyPrice"
                type="number"
                borderColor="brandYellow.800"
                size="lg"
                width="100%"
              />
              <InputRightAddon
                children="Ft/month"
                fontSize="1.2rem"
                backgroundColor="white"
                border="0px"
                fontWeight="600"
                textColor="brandGreen.700"
              />
            </InputGroup>
            {errors.monthlyPrice ? (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.monthlyPrice.message}
              </FormErrorMessage>
            ) : (
              <Box sx={placeholderStyles}>Placeholder text</Box>
            )}
          </FormControl>
          <HStack width="100%">
            <VStack width="50%" alignItems="start">
              <FormControl isInvalid={!!errors.furnished}>
                <FormLabel sx={formLabelStyles}>
                  Is the property furnished?
                </FormLabel>
                <RadioGroup name="furnished" size="lg" colorScheme="green">
                  <HStack>
                    <Radio
                      value="true"
                      {...register("furnished", {
                        required: "This field is required",
                      })}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="false"
                      {...register("furnished", {
                        required: "This field is required",
                      })}
                    >
                      No
                    </Radio>
                  </HStack>
                  {errors.furnished ? (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.furnished.message}
                    </FormErrorMessage>
                  ) : (
                    <Box sx={placeholderStyles}>Placeholder text</Box>
                  )}
                </RadioGroup>
              </FormControl>
            </VStack>
            <VStack width="50%" alignItems="start">
              <FormControl isInvalid={!!errors.parking}>
                <FormLabel sx={formLabelStyles}>
                  Is there parking available?
                </FormLabel>
                <RadioGroup name="parking" size="lg" colorScheme="green">
                  <HStack>
                    <Radio
                      value="true"
                      {...register("parking", {
                        required: "This field is required",
                      })}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value="false"
                      {...register("parking", {
                        required: "This field is required",
                      })}
                    >
                      No
                    </Radio>
                  </HStack>
                  {errors.parking ? (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.parking.message}
                    </FormErrorMessage>
                  ) : (
                    <Box sx={placeholderStyles}>Placeholder text</Box>
                  )}
                </RadioGroup>
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

export default ThirdStep;
