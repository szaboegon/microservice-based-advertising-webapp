import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { NewAdvertisementRequest } from "../../../models/forms/newAdvertisementRequest";
import { formErrorMessageStyles } from "../../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../../styles/formLabelStyles";
import { placeholderStyles } from "../../../styles/placeholderStyles";

interface IFirstStepProps {
  formValues: NewAdvertisementRequest;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementRequest>>;
  nextStep: () => void;
}

const FirstStep: React.FunctionComponent<IFirstStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewAdvertisementRequest>();

  const saveData = (data: NewAdvertisementRequest) => {
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
          <FormControl width="80%" isInvalid={!!errors.categoryName}>
            <FormLabel sx={formLabelStyles} htmlFor="categoryName">
              Please choose:
            </FormLabel>
            <RadioGroup
              name="categoryName"
              id="categoryName"
              alignSelf="center"
              size="lg"
            >
              <HStack justifyContent="space-between">
                <Radio
                  {...register("categoryName", {
                    required: "This field is required",
                  })}
                  colorScheme="green"
                  value="apartment"
                >
                  Apartment
                </Radio>
                <Radio
                  {...register("categoryName", {
                    required: "This field is required",
                  })}
                  colorScheme="green"
                  value="house"
                >
                  House
                </Radio>
                <Radio
                  {...register("categoryName", {
                    required: "This field is required",
                  })}
                  colorScheme="green"
                  value="room"
                >
                  Room
                </Radio>
              </HStack>
            </RadioGroup>
            {errors.categoryName ? (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.categoryName.message}
              </FormErrorMessage>
            ) : (
              <Box sx={placeholderStyles}>Placeholder text</Box>
            )}
          </FormControl>
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

export default FirstStep;
