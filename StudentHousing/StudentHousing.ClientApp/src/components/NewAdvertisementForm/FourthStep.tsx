import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import * as React from "react";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";
import { formLabelStyles } from "../../styles/formLabelStyles";

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
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    nextStep();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Flex
          height="450px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl isRequired>
            <FormLabel sx={formLabelStyles} htmlFor="description">
              Max 1000 characters
            </FormLabel>
            <Textarea
              id="description"
              name="description"
              resize="none"
              height="350px"
              size="md"
              borderColor="brandYellow.800"
              required
              value={formValues.description}
              onChange={handleInputChange}
            ></Textarea>
          </FormControl>
        </Flex>
        <Flex alignItems="center" marginTop="30px" flexDirection="column">
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
