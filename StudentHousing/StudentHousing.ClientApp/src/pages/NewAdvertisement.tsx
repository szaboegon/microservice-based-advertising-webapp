import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { NewAdvertisementFormData } from "../formInterfaces/newAdvertisementFormData";
import FirstStep from "../components/NewAdvertisementForm/FirstStep";
import SecondStep from "../components/NewAdvertisementForm/SecondStep";
import ThirdStep from "../components/NewAdvertisementForm/ThirdStep";
import FourthStep from "../components/NewAdvertisementForm/FourthStep";
import FifthStep from "../components/NewAdvertisementForm/FifthStep";
import ApartmentBuilding1 from "../assets/apartment-building1.jpg";
import { formHeadingStyles } from "../styles/formHeadingStyles";

export const NewAdvertisement = () => {
  const initialFormValues: NewAdvertisementFormData = {
    categoryName: "",
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
  };

  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [image, setImage] = useState<File>();

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      /*{
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
          image: image,
        };
      }*/
      const data = new FormData();
      data.append("categoryName", formValues.categoryName);
      data.append("region", formValues.region);
      data.append("postalCode", formValues.postalCode);
      data.append("city", formValues.city);
      data.append("district", formValues.district);
      data.append("streetName", formValues.streetName);
      data.append("streetNumber", formValues.streetNumber);
      data.append("unitNumber", formValues.unitNumber);
      data.append("numberOfRooms", formValues.numberOfRooms);
      data.append("size", formValues.size);
      data.append("furnished", formValues.furnished);
      data.append("parking", formValues.parking);
      data.append("description", formValues.description);
      data.append("monthlyPrice", formValues.monthlyPrice);
      if (image) {
        data.append("image", image);
      }
      let response = await fetch("/api/advertisement", {
        method: "POST",
        headers: {
          Accept: "text json",
        },
        body: data,
      });
      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        setFormValues(initialFormValues);
        setStep(0);
        let json = await response.json();
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (error) {
      //setError(true);
      //setTimeout(() => setError(false), 5000);
      console.log(error);
    }
  };

  const renderSuccessAlert = () => {
    return (
      <Alert status="success">
        <AlertIcon />
        <AlertTitle>Creating your Advertisement was successful!</AlertTitle>
      </Alert>
    );
  };

  const renderErrorAlert = () => {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>There was an error processing your request.</AlertTitle>
      </Alert>
    );
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const conditionalHeader = () => {
    switch (step) {
      case 0:
        return (
          <Heading sx={formHeadingStyles} marginTop="34px">
            Category of the property
          </Heading>
        );
      case 1:
        return <Heading sx={formHeadingStyles}>Address</Heading>;
      case 2:
        return <Heading sx={formHeadingStyles}>Details</Heading>;
      case 3:
        return <Heading sx={formHeadingStyles}>Description</Heading>;
      case 4:
        return <Heading sx={formHeadingStyles}>Upload an Image</Heading>;
    }
  };

  return (
    <>
      <Box height="900px">
        <Flex
          width={{ base: "0%", xl: "50%" }}
          overflow="hidden"
          float="left"
          height="100%"
        >
          <Image
            maxWidth="950px"
            height="auto"
            alignSelf="end"
            src={ApartmentBuilding1}
          ></Image>
        </Flex>
        <Flex
          justifyContent="center"
          width={{ base: "100%", xl: "50%" }}
          alignItems="center"
          height="100%"
        >
          <Flex flexDirection="column">
            <Tabs
              index={step}
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
                  onClick={prevStep}
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
              <TabPanels>
                <TabPanel>
                  <FirstStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                    nextStep={nextStep}
                  />
                </TabPanel>
                <TabPanel>
                  <SecondStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                    nextStep={nextStep}
                  />
                </TabPanel>
                <TabPanel>
                  <ThirdStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                    nextStep={nextStep}
                  />
                </TabPanel>
                <TabPanel>
                  <FourthStep
                    formValues={formValues}
                    setFormValues={setFormValues}
                    nextStep={nextStep}
                  />
                </TabPanel>
                <TabPanel>
                  <FifthStep setImage={setImage} handleSubmit={handleSubmit} />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {success && renderSuccessAlert()}
            {error && renderErrorAlert()}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
