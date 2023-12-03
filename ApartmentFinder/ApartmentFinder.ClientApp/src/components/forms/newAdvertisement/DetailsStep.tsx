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
import { NewAdvertisementRequest } from "../../../models/requests/newAdvertisementRequest";
import { formErrorMessageStyles } from "../../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../../styles/formLabelStyles";
import { placeholderStyles } from "../../../styles/placeholderStyles";

interface IDetailsStepProps {
  formValues: NewAdvertisementRequest;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementRequest>>;
  nextStep: () => void;
}

const DetailsStep: React.FunctionComponent<IDetailsStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const [isRoom, setIsRoom] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewAdvertisementRequest>();

  const saveData = (data: NewAdvertisementRequest) => {
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
          height="420px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="10px"
        >
          <HStack width="100%" alignItems="start">
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
                  disabled: isRoom,
                })}
                id="numberOfRooms"
                type="number"
                borderColor="gray.500"
                size="lg"
                width="100%"
              ></Input>
              {errors.numberOfRooms && (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.numberOfRooms.message}
                </FormErrorMessage>
              )}
            </FormControl>

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
                  step="0.1"
                  width="100%"
                  borderColor="gray.500"
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
              {errors.size && (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.size.message}
                </FormErrorMessage>
              )}
            </FormControl>
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
                borderColor="gray.500"
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
            {errors.monthlyPrice && (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.monthlyPrice.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <HStack width="100%">
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
                {errors.furnished && (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.furnished.message}
                  </FormErrorMessage>
                )}
              </RadioGroup>
            </FormControl>
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
                {errors.parking && (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.parking.message}
                  </FormErrorMessage>
                )}
              </RadioGroup>
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

export default DetailsStep;
