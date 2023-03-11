import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";
import { formLabelStyles } from "../../styles/formLabelStyles";

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
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    nextStep();
  };

  const [isRoom, setIsRoom] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };

  React.useEffect(() => {
    if (formValues.category.toUpperCase() == "ROOM") {
      setIsRoom(true);
    } else {
      setIsRoom(false);
    }
  }, [formValues.category]);

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
            <HStack>
              <VStack width="50%">
                <FormLabel
                  sx={formLabelStyles}
                  htmlFor="numberOfRooms"
                  alignSelf="start"
                >
                  Number of rooms:
                </FormLabel>
                <NumberInput
                  max={40}
                  min={1}
                  borderColor="brandYellow.800"
                  size="lg"
                  width="100%"
                >
                  <NumberInputField //TODO: probably should use normal imput instead
                    id="numberOfRooms"
                    name="numberOfRooms"
                    maxLength={4}
                    required
                    onChange={handleInputChange}
                    value={formValues.numberOfRooms}
                    disabled={isRoom}
                  />
                </NumberInput>
              </VStack>
              <VStack width="50%">
                <FormLabel sx={formLabelStyles} htmlFor="size">
                  Size:
                </FormLabel>
                <InputGroup>
                  <NumberInput min={1} borderColor="brandYellow.800" size="lg">
                    <NumberInputField
                      id="size"
                      name="size"
                      maxLength={5}
                      required
                      value={formValues.size}
                      onChange={handleInputChange}
                      width="100%"
                    />
                  </NumberInput>
                  <InputRightAddon
                    children="m²"
                    fontSize="1.2rem"
                    backgroundColor="white"
                    border="0px"
                    fontWeight="600"
                    textColor="brandGreen.700"
                  />
                </InputGroup>
              </VStack>
            </HStack>
            <FormLabel sx={formLabelStyles} htmlFor="monthlyPrice">
              Monthly Price:
            </FormLabel>
            <InputGroup>
              <NumberInput
                min={1}
                borderColor="brandYellow.800"
                size="lg"
                width="100%"
              >
                <NumberInputField
                  id="monthlyPrice"
                  name="monthlyPrice"
                  maxLength={10}
                  required
                  value={formValues.monthlyPrice}
                  onChange={handleInputChange}
                />
              </NumberInput>
              <InputRightAddon
                children="Ft/month"
                fontSize="1.2rem"
                backgroundColor="white"
                border="0px"
                fontWeight="600"
                textColor="brandGreen.700"
              />
            </InputGroup>
            <HStack>
              <VStack width="50%" alignItems="start">
                <FormLabel sx={formLabelStyles}>
                  Is the property furnished?
                </FormLabel>
                <RadioGroup
                  name="furnished"
                  size="lg"
                  value={formValues.furnished}
                  colorScheme="green"
                >
                  <HStack>
                    <Radio value="true" onChange={handleInputChange}>
                      Yes
                    </Radio>
                    <Radio value="false" onChange={handleInputChange}>
                      No
                    </Radio>
                  </HStack>
                </RadioGroup>
              </VStack>
              <VStack width="50%" alignItems="start">
                <FormLabel sx={formLabelStyles}>
                  Is there parking available?
                </FormLabel>
                <RadioGroup
                  name="parking"
                  size="lg"
                  value={formValues.parking}
                  colorScheme="green"
                >
                  <HStack>
                    <Radio value="true" onChange={handleInputChange}>
                      Yes
                    </Radio>
                    <Radio value="false" onChange={handleInputChange}>
                      No
                    </Radio>
                  </HStack>
                </RadioGroup>
              </VStack>
            </HStack>
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

export default ThirdStep;
