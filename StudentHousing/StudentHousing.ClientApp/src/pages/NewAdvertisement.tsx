import { ArrowLeftIcon } from "@chakra-ui/icons";
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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  InputRightAddon,
  InputGroup,
  Spacer,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { NewAdvertisementData } from "../models/newAdvertisementData.model";

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
    price: "",
    image: "",
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

  const handleSubmit = async () => {
    if (tabIndex != 4) {
      setTabIndex(tabIndex + 1);
      console.log(tabIndex);
      return;
    }
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

  const handleBackButton = () => {
    if (tabIndex > 0) {
      setTabIndex(tabIndex - 1);
    }
  };

  const headingStyles = {
    textColor: "gray.500",
    fontSize: "1.8rem",
    textAlign: "center",
  };

  const tabPanelStyles = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const conditionalComponent = () => {
    switch (tabIndex) {
      case 0:
        return (
          <Heading sx={headingStyles} marginTop="34px">
            Category of the property
          </Heading>
        );
      case 1:
        return <Heading sx={headingStyles}>Address</Heading>;
      case 2:
        return <Heading sx={headingStyles}>Details</Heading>;
      case 3:
        return <Heading sx={headingStyles}>Description</Heading>;
      case 4:
        return <Heading sx={headingStyles}>Upload an Image</Heading>;
    }
  };

  return (
    <>
      <Flex marginTop="60px" justifyContent="center">
        <form>
          <Flex flexDirection="column" height="100%">
            <Tabs
              index={tabIndex}
              height="450px"
              width="600px"
              isFitted
              variant="soft-rounded"
              colorScheme="green"
            >
              <TabList>
                <Tab>Category</Tab>
                <Tab>Address</Tab>
                <Tab>Details</Tab>
                <Tab>Description</Tab>
                <Tab>Image</Tab>
              </TabList>
              {tabIndex != 0 ? (
                <Button
                  variant="link"
                  leftIcon={<ArrowLeftIcon />}
                  onClick={handleBackButton}
                  marginLeft="30px"
                  marginTop="10px"
                  color="brandYellow.800"
                >
                  Back
                </Button>
              ) : (
                <></>
              )}
              {conditionalComponent()}
              <TabPanels display="flex" justifyContent="center" height="100%">
                <TabPanel sx={tabPanelStyles}>
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
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <FormControl>
                    <FormLabel htmlFor="region">Region:</FormLabel>
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
                      <option value="Borsod-Abaúj-Zemplén">
                        Borsod-Abaúj-Zemplén
                      </option>
                      <option value="Csongrád-Csanád">Csongrád-Csanád</option>
                      <option value="Fejér">Fejér</option>
                      <option value="Győr-Moson-Sopron">
                        Győr-Moson-Sopron
                      </option>
                      <option value="Hajdú-Bihar">Hajdú-Bihar</option>
                      <option value="Heves">Heves</option>
                      <option value="Jász-Nagykun-Szolnok">
                        Jász-Nagykun-Szolnok
                      </option>
                      <option value="Komárom-Esztergom">
                        Komárom-Esztergom
                      </option>
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
                        <FormLabel htmlFor="city" alignSelf="start">
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
                        <FormLabel htmlFor="postalCode" alignSelf="start">
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
                    <FormLabel htmlFor="district">District:</FormLabel>
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
                    <FormLabel htmlFor="streetName">Street name:</FormLabel>
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
                        <FormLabel htmlFor="streetNumber" alignSelf="start">
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
                        <FormLabel htmlFor="unitNumber" alignSelf="start">
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
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <FormControl>
                    <HStack>
                      <VStack width="50%">
                        <FormLabel htmlFor="numberOfRooms" alignSelf="start">
                          Number of rooms:
                        </FormLabel>
                        <NumberInput
                          max={40}
                          min={1}
                          step={0.5}
                          variant="flushed"
                          borderColor="brandYellow.800"
                          size="lg"
                          width="100%"
                        >
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
                      </VStack>
                      <VStack width="50%">
                        <FormLabel htmlFor="size" alignSelf="start">
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
                    <FormLabel htmlFor="price">Price:</FormLabel>
                    <InputGroup>
                      <NumberInput
                        min={1}
                        variant="flushed"
                        borderColor="brandYellow.800"
                        size="lg"
                        width="100%"
                      >
                        <NumberInputField
                          id="price"
                          name="price"
                          maxLength={10}
                          required
                          value={formValues.price}
                          onChange={handleInputChange}
                        />
                      </NumberInput>
                      <InputRightAddon
                        children="Ft/month"
                        backgroundColor="white"
                        border="0px"
                        fontWeight="600"
                        textColor="brandYellow.900"
                      />
                    </InputGroup>
                    <HStack>
                      <VStack width="50%" alignItems="start">
                        <FormLabel>Furnished:</FormLabel>
                        <RadioGroup
                          name="furnished"
                          size="lg"
                          value={formValues.furnished}
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
                        <FormLabel>Parking:</FormLabel>
                        <RadioGroup
                          name="parking"
                          size="lg"
                          value={formValues.parking}
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
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <FormControl>
                    <FormLabel htmlFor="description">
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
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <FormControl>
                    <Input type="file" accept="image/*"></Input>
                  </FormControl>
                </TabPanel>
              </TabPanels>
              <Flex justifyContent="center" padding="20px">
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  width="350px"
                  height="40px"
                  bgColor="brandGreen.500"
                  textColor="white"
                  _hover={{ background: "brandGreen.700" }}
                >
                  {tabIndex === 4 ? "Submit" : "Next"}
                </Button>
              </Flex>
            </Tabs>
          </Flex>
        </form>
      </Flex>
    </>
  );
};
