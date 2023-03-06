import {
  Box,
  Flex,
  FormControl,
  HStack,
  VStack,
  Radio,
  RadioGroup,
  Heading,
  Input,
  FormLabel,
  NumberInput,
  NumberInputField,
  Select,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

export const NewAdvertisement = () => {
  const initialFormValues = {
    category: "apartment",
    region: "",
    postalCode: "",
    city: "",
    district: "",
    streetName: "",
    streetNumber: "",
    unitNumber: "",
    numberOfRooms: "",
    size: "",
    furnished: "",
    parking: "",
    description: "",
    image: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let response = await fetch("/api/advertisement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      if (response.ok) {
        let json = await response.json();
        setFormValues(initialFormValues);
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headingStyles = {
    textColor: "gray.500",
    fontSize: "2rem",
  };

  return (
    <>
      <Box
        marginX="auto"
        width="75%"
        border="2px"
        marginTop="30px"
        borderColor="brandGreen.500"
      >
        <form onSubmit={handleSubmit}>
          <Flex flexDirection="row" justifyContent="center">
            <VStack alignItems="start" marginX="30px" width="45%">
              <Heading textAlign="center" fontSize="2.8rem">
                Post Advertisement
              </Heading>
              <Heading sx={headingStyles}>Category of the property</Heading>
              <FormControl>
                <RadioGroup name="category" value={formValues.category}>
                  <HStack>
                    <Radio value="apartment" onChange={handleInputChange}>
                      Apartment
                    </Radio>
                    <Radio value="house" onChange={handleInputChange}>
                      House
                    </Radio>
                    <Radio value="room" onChange={handleInputChange}>
                      Room
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Heading sx={headingStyles}>Address</Heading>
              <FormControl>
                <FormLabel htmlFor="region">Region:</FormLabel>
                <Select
                  id="region"
                  name="region"
                  variant="outline"
                  placeholder="Choose"
                  required
                  value={formValues.region}
                  onChange={handleInputChange}
                >
                  <option value="Bács-Kiskun">Bács-Kiskun</option>
                  <option value="Baranya">Baranya</option>
                  <option value="Borsod-Abaúj-Zemplén">
                    Borsod-Abaúj-Zemplén
                  </option>
                  <option value="Csongrád-Csanád">Csongrád-Csanád</option>
                  <option value="Fejér">Fejér</option>
                  <option value="Győr-Moson-Sopron">Győr-Moson-Sopron</option>
                  <option value="Hajdú-Bihar">Hajdú-Bihar</option>
                  <option value="Heves">Heves</option>
                  <option value="Jász-Nagykun-Szolnok">
                    Jász-Nagykun-Szolnok
                  </option>
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
                <FormLabel htmlFor="postalCode">Postal Code:</FormLabel>
                <NumberInput variant="outline">
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
                <FormLabel htmlFor="city">City:</FormLabel>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  variant="outline"
                  placeholder="e.g. Budapest"
                  required
                  value={formValues.city}
                  onChange={handleInputChange}
                ></Input>
                <FormLabel htmlFor="district">District:</FormLabel>{" "}
                {/*Todo only if city=Budapest*/}
                <Input
                  id="district"
                  name="district"
                  type="text"
                  variant="outline"
                  maxLength={6}
                  placeholder="e.g. XI."
                  value={formValues.district}
                  onChange={handleInputChange}
                ></Input>
                <FormLabel htmlFor="streetName">Street name:</FormLabel>
                <Input
                  id="streetName"
                  name="streetName"
                  type="text"
                  variant="outline"
                  maxLength={40}
                  placeholder="e.g. Király St."
                  required
                  value={formValues.streetName}
                  onChange={handleInputChange}
                ></Input>
                <FormLabel htmlFor="streetNumber">Street number:</FormLabel>
                <Input
                  id="streetNumber"
                  name="streetNumber"
                  type="text"
                  variant="outline"
                  maxLength={20}
                  required
                  value={formValues.streetNumber}
                  onChange={handleInputChange}
                ></Input>
                <FormLabel htmlFor="unitNumber">Unit number:</FormLabel>
                <Input
                  id="unitNumber"
                  name="unitNumber"
                  type="text"
                  variant="outline"
                  maxLength={20}
                  value={formValues.unitNumber}
                  onChange={handleInputChange}
                ></Input>
              </FormControl>
            </VStack>
            <VStack alignItems="start" marginX="30px" width="45%">
              <Heading sx={headingStyles}>Details</Heading>
              <FormControl>
                <FormLabel htmlFor="numberOfRooms">Number of rooms</FormLabel>
                <NumberInput max={40} min={1} step={0.5} variant="outline">
                  <NumberInputField
                    id="numberOfRooms"
                    name="numberOfRooms"
                    maxLength={4}
                    required
                    value={formValues.numberOfRooms}
                    onChange={handleInputChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor="size">Size</FormLabel>
                <NumberInput min={1} variant="outline">
                  <NumberInputField
                    id="size"
                    name="size"
                    maxLength={5}
                    required
                    value={formValues.size}
                    onChange={handleInputChange}
                  />
                </NumberInput>
                <FormLabel>Furnished</FormLabel>
                <RadioGroup name="furnished" value={formValues.furnished}>
                  <HStack>
                    <Radio value="true" onChange={handleInputChange}>
                      Yes
                    </Radio>
                    <Radio value="false" onChange={handleInputChange}>
                      No
                    </Radio>
                  </HStack>
                </RadioGroup>
                <FormLabel>Parking</FormLabel>
                <RadioGroup name="parking" value={formValues.parking}>
                  <HStack>
                    <Radio value="true" onChange={handleInputChange}>
                      Yes
                    </Radio>
                    <Radio value="false" onChange={handleInputChange}>
                      No
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Heading sx={headingStyles}>Description</Heading>
              <FormControl>
                <FormLabel htmlFor="description">Max 1000 characters</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  resize="none"
                  height="180px"
                  size="md"
                  required
                  value={formValues.description}
                  onChange={handleInputChange}
                ></Textarea>
              </FormControl>
              <Heading sx={headingStyles}>Upload an Image</Heading>
              <FormControl>
                <Input type="file" accept="image/*"></Input>
              </FormControl>
              <Button type="submit" size="lg">
                Submit
              </Button>
            </VStack>
          </Flex>
        </form>
      </Box>
    </>
  );
};
