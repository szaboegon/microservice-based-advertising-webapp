import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { NewAdvertisementFormData } from "../../../models/formInterfaces/newAdvertisementFormData";
import { formErrorMessageStyles } from "../../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../../styles/formLabelStyles";
import { placeholderStyles } from "../../../styles/placeholderStyles";

interface IFourthStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  nextStep: () => void;
}

const FourthStep: React.FunctionComponent<IFourthStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewAdvertisementFormData>();

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
          <FormControl isInvalid={!!errors.description}>
            <FormLabel sx={formLabelStyles} htmlFor="description">
              Max 1000 characters
            </FormLabel>
            <Textarea
              {...register("description", {
                required: "This field is required",
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
              borderColor="brandYellow.800"
            ></Textarea>
            {errors.description ? (
              <FormErrorMessage sx={formErrorMessageStyles}>
                {errors.description.message}
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

export default FourthStep;
