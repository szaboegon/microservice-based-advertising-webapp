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
  Spinner,
  Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { NewAdvertisementRequest } from "../models/requests/newAdvertisementRequest";
import CategoryStep from "../components/forms/newAdvertisement/CategoryStep";
import AddressStep from "../components/forms/newAdvertisement/AddressStep";
import DetailsStep from "../components/forms/newAdvertisement/DetailsStep";
import DescriptionStep from "../components/forms/newAdvertisement/DescriptionStep";
import ImagesStep from "../components/forms/newAdvertisement/ImagesStep";
import { formHeadingStyles } from "../styles/formHeadingStyles";
import { useMutation } from "react-query";
import AdvertisementService from "../services/advertisementService";
import { SuccessAlert } from "../components/shared/alerts/SuccessAlert";
import { ErrorAlert } from "../components/shared/alerts/ErrorAlert";
import { NAVBAR_HEIGHT } from "../assets/literals/constants";
import FormBackground from "../assets/images/form-background.jpg";

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
  const [images, setImages] = useState<File[]>([]);

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
      images.forEach((image, i) => {
        formData.append(`images`, image);
      });
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
      <Box
        width="100%"
        height={`calc(100vh - ${NAVBAR_HEIGHT})`}
        position="relative"
        backgroundImage={FormBackground}
        backgroundSize="cover"
        backgroundPosition="bottom"
      >
        <Box
          width="100%"
          height={`calc(100vh - ${NAVBAR_HEIGHT})`}
          backgroundColor="rgba(0, 0, 0, 0.6)"
          position="absolute"
        />

        <Flex
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <Card
            justifyContent="center"
            alignItems="center"
            padding="30px"
            variant="elevated"
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
                  <Tab>Images</Tab>
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
                    <CategoryStep
                      formValues={formValues}
                      setFormValues={setFormValues}
                      nextStep={nextStep}
                    />
                  </TabPanel>
                  <TabPanel>
                    <AddressStep
                      formValues={formValues}
                      setFormValues={setFormValues}
                      nextStep={nextStep}
                    />
                  </TabPanel>
                  <TabPanel>
                    <DetailsStep
                      formValues={formValues}
                      setFormValues={setFormValues}
                      nextStep={nextStep}
                    />
                  </TabPanel>
                  <TabPanel>
                    <DescriptionStep
                      formValues={formValues}
                      setFormValues={setFormValues}
                      nextStep={nextStep}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ImagesStep setImages={setImages} submitData={submitData} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              {isSuccess && (
                <SuccessAlert message="Creating your advertisement was successful." />
              )}
              {isLoading && <Spinner />}
              {isError && error instanceof Error && (
                <ErrorAlert error={error} />
              )}
            </Flex>
          </Card>
        </Flex>
      </Box>
    </>
  );
};
