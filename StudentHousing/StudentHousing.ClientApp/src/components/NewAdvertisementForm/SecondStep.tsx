import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useEffect } from "react";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";
import { formLabelStyles } from "../../styles/formLabelStyles";

interface ISecondStepProps {
  formValues: NewAdvertisementFormData;
  setFormValues: React.Dispatch<React.SetStateAction<NewAdvertisementFormData>>;
  nextStep: () => void;
}

const SecondStep: React.FunctionComponent<ISecondStepProps> = ({
  formValues,
  setFormValues,
  nextStep,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    nextStep();
  };

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
      <form onSubmit={handleSubmit}>
        <Flex
          height="450px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl isRequired>
            <FormLabel sx={formLabelStyles} htmlFor="region">
              Region:
            </FormLabel>
            <Select
              id="region"
              name="region"
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
              <option value="Szabolcs-Szatmár-Bereg">
                Szabolcs-Szatmár-Bereg
              </option>
              <option value="Tolna">Tolna</option>
              <option value="Vas">Vas</option>
              <option value="Veszprém">Veszprém</option>
              <option value="Zala">Zala</option>
            </Select>
            <HStack>
              <VStack width="50%">
                <FormLabel sx={formLabelStyles} htmlFor="city">
                  City:
                </FormLabel>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  borderColor="brandYellow.800"
                  placeholder="e.g. Budapest"
                  required
                  value={formValues.city}
                  onChange={handleInputChange}
                  size="lg"
                ></Input>
              </VStack>
              <VStack width="50%">
                <FormLabel sx={formLabelStyles} htmlFor="postalCode">
                  Postal Code:
                </FormLabel>
                <Input
                  id="postalCode"
                  name="postalCode"
                  required
                  type="number"
                  maxLength={4}
                  min={1000}
                  max={9999}
                  value={formValues.postalCode}
                  onChange={handleInputChange}
                  placeholder="e.g. 1089"
                  borderColor="brandYellow.800"
                  size="lg"
                  width="100%"
                ></Input>
              </VStack>
            </HStack>
            <FormLabel sx={formLabelStyles} htmlFor="district">
              District (only required for Budapest):
            </FormLabel>
            <Input
              id="district"
              name="district"
              type="text"
              borderColor="brandYellow.800"
              maxLength={6}
              placeholder="e.g. XI."
              value={formValues.district}
              onChange={handleInputChange}
              disabled={isDistrictDisabled}
              size="lg"
            ></Input>
            <FormLabel sx={formLabelStyles} htmlFor="streetName">
              Street name:
            </FormLabel>
            <Input
              id="streetName"
              name="streetName"
              type="text"
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
                  sx={formLabelStyles}
                  htmlFor="streetNumber"
                  alignSelf="start"
                >
                  Street number:
                </FormLabel>
                <Input
                  id="streetNumber"
                  name="streetNumber"
                  type="text"
                  borderColor="brandYellow.800"
                  maxLength={20}
                  required
                  value={formValues.streetNumber}
                  onChange={handleInputChange}
                  size="lg"
                ></Input>
              </VStack>
              <VStack width="50%">
                <FormLabel
                  sx={formLabelStyles}
                  htmlFor="unitNumber"
                  alignSelf="start"
                >
                  Unit number:
                </FormLabel>
                <Input
                  id="unitNumber"
                  name="unitNumber"
                  type="text"
                  borderColor="brandYellow.800"
                  maxLength={20}
                  value={formValues.unitNumber}
                  onChange={handleInputChange}
                  size="lg"
                ></Input>
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

export default SecondStep;
