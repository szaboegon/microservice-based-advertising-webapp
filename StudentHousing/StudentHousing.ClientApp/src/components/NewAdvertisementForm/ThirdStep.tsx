import {
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

interface IThirdStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  labelStyles: Object;
}

const ThirdStep: React.FunctionComponent<IThirdStepProps> = ({
  formValues,
  setFormValues,
  labelStyles,
}) => {
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
      <FormControl>
        <HStack>
          <VStack width="50%">
            <FormLabel
              sx={labelStyles}
              htmlFor="numberOfRooms"
              alignSelf="start"
            >
              Number of rooms:
            </FormLabel>
            <NumberInput
              max={40}
              min={1}
              step={isRoom ? 0 : 0.5}
              variant="flushed"
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
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
          <VStack width="50%">
            <FormLabel sx={labelStyles} htmlFor="size">
              Size:
            </FormLabel>
            <InputGroup>
              <NumberInput
                min={1}
                variant="flushed"
                borderColor="brandYellow.800"
                size="lg"
              >
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
                textColor="brandYellow.900"
              />
            </InputGroup>
          </VStack>
        </HStack>
        <FormLabel sx={labelStyles} htmlFor="monthlyPrice">
          Price:
        </FormLabel>
        <InputGroup>
          <NumberInput
            min={1}
            variant="flushed"
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
            textColor="brandYellow.900"
          />
        </InputGroup>
        <HStack>
          <VStack width="50%" alignItems="start">
            <FormLabel sx={labelStyles}>Furnished:</FormLabel>
            <RadioGroup name="furnished" size="lg" value={formValues.furnished}>
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
            <FormLabel sx={labelStyles}>Parking:</FormLabel>
            <RadioGroup name="parking" size="lg" value={formValues.parking}>
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
    </>
  );
};

export default ThirdStep;
