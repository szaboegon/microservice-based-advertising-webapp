import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import * as React from "react";
import { NewAdvertisementFormData } from "../../models/newAdvertisementFormData.model";

interface IFourthStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  labelStyles: Object;
}

const FourthStep: React.FunctionComponent<IFourthStepProps> = ({
  formValues,
  setFormValues,
  labelStyles,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };
  return (
    <>
      <FormControl>
        <FormLabel sx={labelStyles} htmlFor="description">
          Max 1000 characters
        </FormLabel>
        <Textarea
          id="description"
          name="description"
          resize="none"
          height="350px"
          size="md"
          required
          value={formValues.description}
          onChange={handleInputChange}
        ></Textarea>
      </FormControl>
    </>
  );
};

export default FourthStep;
