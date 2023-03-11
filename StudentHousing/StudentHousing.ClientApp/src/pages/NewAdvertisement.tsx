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
import ErrorAlert from "../components/NewAdvertisementForm/ErrorAlert";

export const NewAdvertisement = () => {
  const initialFormValues: NewAdvertisementFormData = {
    category: "",
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

  const [step, setStep] = useState(0);
  const [errorTabIndex, setErrorTabIndex] = useState(-1);
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleSubmit = async () => {
    setErrorTabIndex(-1);
    if (step < 4) {
      if (handleValidation()) {
        setStep(step + 1);
      }
      return;
    }
    try {
      {
        var newAdvertisementDTO = {
          category: formValues.category,
          region: formValues.region,
          postalCode: parseInt(formValues.postalCode),
          city: formValues.city,
          district: formValues.district,
          streetName: formValues.streetName,
          streetNumber: formValues.streetNumber,
          unitNumber: formValues.unitNumber,
          numberOfRooms: parseFloat(formValues.numberOfRooms),
          size: parseFloat(formValues.size),
          furnished: JSON.parse(formValues.furnished),
          parking: JSON.parse(formValues.parking),
          description: formValues.description,
          monthlyPrice: parseFloat(formValues.monthlyPrice),
          image: "",
        };
      }
      let response = await fetch("/api/advertisement", {
        method: "POST",
        headers: {
          Accept: "text json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdvertisementDTO),
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

  const handleValidation = (): boolean => {
    switch (step) {
      case 0: {
        if (formValues.category === "") {
          setErrorTabIndex(0);
          return false;
        } else return true;
      }
      case 1: {
        if (
          formValues.region === "" ||
          formValues.postalCode === "" ||
          formValues.city === "" ||
          (formValues.city.toUpperCase() === "BUDAPEST" &&
            formValues.district === "") ||
          formValues.streetName === "" ||
          formValues.streetNumber === "" ||
          formValues.unitNumber === ""
        ) {
          setErrorTabIndex(1);
          return false;
        } else return true;
      }
      case 2: {
        if (
          (formValues.category.toUpperCase() != "ROOM" &&
            formValues.numberOfRooms == "") ||
          formValues.size === "" ||
          formValues.monthlyPrice === "" ||
          formValues.parking === "" ||
          formValues.furnished === ""
        ) {
          setErrorTabIndex(2);
          return false;
        }
        return true;
      }
      case 3: {
        if (formValues.description === "") {
          setErrorTabIndex(3);
          return false;
        }
        return true;
      }
      case 4: {
        return true;
      }
      default:
        return true;
    }
  };

  const renderErrorAlert = () => {
    switch (errorTabIndex) {
      case 0:
        return <ErrorAlert description="Please select a category!" />;
      case 1:
        return (
          <ErrorAlert description="Please fill out all required fields!" />
        );
      case 2:
        return (
          <ErrorAlert description="Please fill out all required fields!" />
        );
      case 3:
        return <ErrorAlert description="Please write a description!" />;
      case 4:
        return <ErrorAlert description="Please upload an image!" />;
      default:
        return <></>;
    }
  };

  const renderSuccessAlert = () => {};

  const handleBackButton = () => {
    if (step > 0) {
      setErrorTabIndex(-1);
      setStep(step - 1);
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
    switch (step) {
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
              index={step}
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
              {step != 0 ? (
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
                {renderErrorAlert()}
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  width="350px"
                  height="40px"
                  bgColor="brandGreen.500"
                  textColor="white"
                  _hover={{ background: "brandGreen.700" }}
                >
                  {step === 4 ? "Submit" : "Next"}
                </Button>
              </Flex>
            </Tabs>
          </Flex>
        </form>
      </Flex>
    </>
  );
};
