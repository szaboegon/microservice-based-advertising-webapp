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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { NewAdvertisementFormData } from "../formInterfaces/newAdvertisementFormData";
import FirstStep from "../components/NewAdvertisementForm/FirstStep";
import SecondStep from "../components/NewAdvertisementForm/SecondStep";
import ThirdStep from "../components/NewAdvertisementForm/ThirdStep";
import FourthStep from "../components/NewAdvertisementForm/FourthStep";
import FifthStep from "../components/NewAdvertisementForm/FifthStep";

export const NewAdvertisement = () => {
  const initialFormValues: NewAdvertisementFormData = {
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
    monthlyPrice: "",
    image: "",
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);

  useEffect(() => {
    if (formValues.city.toUpperCase() == "BUDAPEST") {
      setIsDistrictDisabled(false);
    } else {
      setIsDistrictDisabled(true);
    }
  }, [formValues.city]);

  const handleSubmit = async () => {
    if (tabIndex < 4) {
      setTabIndex(tabIndex + 1);
      return;
    }
    try {
      let response = await fetch("/api/advertisement", {
        method: "POST",
        headers: {
          Accept: "text json",
          "Content-Type": "application/json",
        },
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

  const handleValidation = () => {
    switch (tabIndex) {
      case 0:
    }
  };

  const renderAlert = () => {
    return (
      <Alert status="error" marginBottom="20px">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>
    );
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

  const labelStyles = {
    textColor: "gray.600",
    alignSelf: "start",
    fontSize: "1.1rem",
    marginTop: "15px",
    marginBottom: "0px",
  };

  const conditionalHeader = () => {
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
              {conditionalHeader()}
              <TabPanels display="flex" justifyContent="center" height="100%">
                <TabPanel sx={tabPanelStyles}>
                  <FirstStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                  />
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <SecondStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                    isDistrictDisabled={isDistrictDisabled}
                    labelStyles={labelStyles}
                  />
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <ThirdStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                    labelStyles={labelStyles}
                  />
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <FourthStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                    labelStyles={labelStyles}
                  />
                </TabPanel>
                <TabPanel sx={tabPanelStyles}>
                  <FifthStep />
                </TabPanel>
              </TabPanels>
              <Flex alignItems="center" margin="30px" flexDirection="column">
                {renderAlert()}
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
