import { FormControl, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import * as React from "react";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";

interface IFirstStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
}

const FirstStep: React.FunctionComponent<IFirstStepProps> = ({
  formValues,
  setFormValues,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <FormControl width="80%">
        <RadioGroup
          name="category"
          value={formValues.category}
          alignSelf="center"
          size="lg"
        >
          <HStack justifyContent="space-around">
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
    </>
  );
};

export default FirstStep;
