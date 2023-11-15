import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { NewAdvertisementRequest } from "../../../models/requests/newAdvertisementRequest";
import { formErrorMessageStyles } from "../../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../../styles/formLabelStyles";
import { placeholderStyles } from "../../../styles/placeholderStyles";

interface IFourthStepProps {
  formValues: NewAdvertisementRequest;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementRequest>>;
  nextStep: () => void;
}

const DescriptionStep: React.FunctionComponent<IFourthStepProps> = ({
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
          height="420px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl isInvalid={!!errors.description}>
            <FormLabel sx={formLabelStyles} htmlFor="description">
              Write a short description
            </FormLabel>
            <Textarea
              {...register("description", {
                required: "This field is required",
                minLength: {
                  value: 100,
                  message:
                    "The lenght of description must be at least 100 characters",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "The lenght of description must be max 1000 characters",
                },
              })}
              id="description"
              resize="none"
              height="350px"
              size="md"
              borderColor="gray.500"
            ></Textarea>
            <FormHelperText>
              Description must be between 100 and 1000 charachters long.
            </FormHelperText>
            {errors.description && (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.description.message}
              </FormErrorMessage>
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

export default DescriptionStep;
