import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import * as React from "react";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";
import { formLabelStyles } from "../../styles/formLabelStyles";

interface IFirstStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  nextStep: () => void;
}

const FirstStep: React.FunctionComponent<IFirstStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    nextStep();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <FormControl width="80%" isRequired>
            <FormLabel sx={formLabelStyles} htmlFor="categoryName">
              Please choose:
            </FormLabel>
            <RadioGroup
              name="categoryName"
              id="categoryName"
              value={formValues.categoryName}
              alignSelf="center"
              size="lg"
            >
              <HStack justifyContent="space-between">
                <Radio
                  colorScheme="green"
                  value="apartment"
                  onChange={handleInputChange}
                >
                  Apartment
                </Radio>
                <Radio
                  colorScheme="green"
                  value="house"
                  onChange={handleInputChange}
                >
                  House
                </Radio>
                <Radio
                  colorScheme="green"
                  value="room"
                  onChange={handleInputChange}
                >
                  Room
                </Radio>
              </HStack>
            </RadioGroup>
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

export default FirstStep;
