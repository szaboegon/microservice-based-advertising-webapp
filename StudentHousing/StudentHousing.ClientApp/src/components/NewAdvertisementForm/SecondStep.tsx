import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";

interface ISecondStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  labelStyles: Object;
}

const SecondStep: React.FunctionComponent<ISecondStepProps> = ({
  formValues,
  setFormValues,
  labelStyles,
}) => {
  const [isDistrictDisabled, setIsDistrictDisabled] = React.useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (formValues.city.toUpperCase() == "BUDAPEST") {
      setIsDistrictDisabled(false);
    } else {
      setIsDistrictDisabled(true);
    }
  }, [formValues.city]);

  return (
    <>
      <FormControl>
        <FormLabel sx={labelStyles} htmlFor="region">
          Region:
        </FormLabel>
        <Select
          id="region"
          name="region"
          variant="flushed"
          borderColor="brandYellow.800"
          placeholder="Choose"
          required
          value={formValues.region}
          onChange={handleInputChange}
          size="lg"
        >
          <option value="Bács-Kiskun">Bács-Kiskun</option>
          <option value="Baranya">Baranya</option>
          <option value="Borsod-Abaúj-Zemplén">Borsod-Abaúj-Zemplén</option>
          <option value="Csongrád-Csanád">Csongrád-Csanád</option>
          <option value="Fejér">Fejér</option>
          <option value="Győr-Moson-Sopron">Győr-Moson-Sopron</option>
          <option value="Hajdú-Bihar">Hajdú-Bihar</option>
          <option value="Heves">Heves</option>
          <option value="Jász-Nagykun-Szolnok">Jász-Nagykun-Szolnok</option>
          <option value="Komárom-Esztergom">Komárom-Esztergom</option>
          <option value="Nógrád">Nógrád</option>
          <option value="Pest">Pest</option>
          <option value="Somogy">Somogy</option>
          <option value="Szabolcs-Szatmár-Bereg">Szabolcs-Szatmár-Bereg</option>
          <option value="Tolna">Tolna</option>
          <option value="Vas">Vas</option>
          <option value="Veszprém">Veszprém</option>
          <option value="Zala">Zala</option>
        </Select>
        <HStack>
          <VStack width="50%">
            <FormLabel sx={labelStyles} htmlFor="city">
              City:
            </FormLabel>
            <Input
              id="city"
              name="city"
              type="text"
              variant="flushed"
              borderColor="brandYellow.800"
              placeholder="e.g. Budapest"
              required
              value={formValues.city}
              onChange={handleInputChange}
              size="lg"
            ></Input>
          </VStack>
          <VStack width="50%">
            <FormLabel sx={labelStyles} htmlFor="postalCode">
              Postal Code:
            </FormLabel>
            <NumberInput
              variant="flushed"
              borderColor="brandYellow.800"
              size="lg"
              width="100%"
            >
              <NumberInputField
                id="postalCode"
                name="postalCode"
                required
                value={formValues.postalCode}
                onChange={handleInputChange}
                maxLength={4}
                minLength={4}
                placeholder="e.g. 1089"
              />
            </NumberInput>
          </VStack>
        </HStack>
        <FormLabel sx={labelStyles} htmlFor="district">
          District:
        </FormLabel>
        <Input
          id="district"
          name="district"
          type="text"
          variant="flushed"
          borderColor="brandYellow.800"
          maxLength={6}
          placeholder="e.g. XI."
          value={formValues.district}
          onChange={handleInputChange}
          disabled={isDistrictDisabled}
        ></Input>
        <FormLabel sx={labelStyles} htmlFor="streetName">
          Street name:
        </FormLabel>
        <Input
          id="streetName"
          name="streetName"
          type="text"
          variant="flushed"
          borderColor="brandYellow.800"
          maxLength={40}
          placeholder="e.g. Király St."
          required
          value={formValues.streetName}
          onChange={handleInputChange}
          size="lg"
        ></Input>
        <HStack>
          <VStack width="50%">
            <FormLabel
              sx={labelStyles}
              htmlFor="streetNumber"
              alignSelf="start"
            >
              Street number:
            </FormLabel>
            <Input
              id="streetNumber"
              name="streetNumber"
              type="text"
              variant="flushed"
              borderColor="brandYellow.800"
              maxLength={20}
              required
              value={formValues.streetNumber}
              onChange={handleInputChange}
              size="lg"
            ></Input>
          </VStack>
          <VStack width="50%">
            <FormLabel sx={labelStyles} htmlFor="unitNumber" alignSelf="start">
              Unit number:
            </FormLabel>
            <Input
              id="unitNumber"
              name="unitNumber"
              type="text"
              variant="flushed"
              borderColor="brandYellow.800"
              maxLength={20}
              value={formValues.unitNumber}
              onChange={handleInputChange}
              size="lg"
            ></Input>
          </VStack>
        </HStack>
      </FormControl>
    </>
  );
};

export default SecondStep;
