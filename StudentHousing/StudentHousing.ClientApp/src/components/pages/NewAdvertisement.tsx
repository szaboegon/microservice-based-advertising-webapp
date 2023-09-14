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
  Box,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { NewAdvertisementRequest } from "../../models/forms/newAdvertisementRequest";
import FirstStep from "../forms/new-advertisement/FirstStep";
import SecondStep from "../forms/new-advertisement/SecondStep";
import ThirdStep from "../forms/new-advertisement/ThirdStep";
import FourthStep from "../forms/new-advertisement/FourthStep";
import FifthStep from "../forms/new-advertisement/FifthStep";
import ApartmentBuilding1 from "../../assets/images/apartment-building1.jpg";
import { formHeadingStyles } from "../../styles/formHeadingStyles";
import { useMutation } from "react-query";
import AdvertisementService from "../../services/advertisementService";
import { SuccessAlert } from "../alerts/SuccessAlert";
import { ErrorAlert } from "../alerts/ErrorAlert";

export const NewAdvertisement = () => {
  const initialFormValues: NewAdvertisementRequest = {
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
    furnished: "false",
    parking: "false",
    description: "",
    monthlyPrice: "",
  };

  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [image, setImage] = useState<File>();

  const submitData = async (data: NewAdvertisementRequest) => {
    await postAdvertisement();
  };

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    mutateAsync: postAdvertisement,
  } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("categoryName", formValues.categoryName);
      formData.append("region", formValues.region);
      formData.append("postalCode", formValues.postalCode);
      formData.append("city", formValues.city);
      formData.append("district", formValues.district);
      formData.append("streetName", formValues.streetName);
      formData.append("streetNumber", formValues.streetNumber);
      formData.append("unitNumber", formValues.unitNumber);
      formData.append("numberOfRooms", formValues.numberOfRooms ?? 1);
      formData.append("size", formValues.size);
      formData.append("furnished", formValues.furnished);
      formData.append("parking", formValues.parking);
      formData.append("description", formValues.description);
      formData.append("monthlyPrice", formValues.monthlyPrice);
      if (image) {
        formData.append("image", image);
      }
      return await AdvertisementService.create(formData);
    },
  });

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
      <Box height="calc(100vh - 80px)" minHeight="700px">
        <Flex
          width={{ base: "0%", xl: "50%" }}
          overflow="hidden"
          float="left"
          height="100%"
        >
          <Image
            maxWidth="950px"
            height="auto"
            alignSelf="center"
            src={ApartmentBuilding1}
          ></Image>
        </Flex>
        <Flex
          justifyContent="center"
          width={{ base: "100%", xl: "50%" }}
          alignItems="center"
          height="100%"
          scrollBehavior="smooth"
        >
          <Flex flexDirection="column" alignItems="center">
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
                  <FifthStep setImage={setImage} submitData={submitData} />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {isSuccess && (
              <SuccessAlert message="Creating your advertisement was successful." />
            )}
            {isLoading && <Spinner />}
            {isError && error instanceof Error && <ErrorAlert error={error} />}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
