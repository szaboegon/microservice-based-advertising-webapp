import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { NewAdvertisementRequest } from "../../../models/requests/newAdvertisementRequest";
import ImageService from "../../../services/imageService";
import { formLabelStyles } from "../../../styles/formLabelStyles";
import { useState } from "react";

interface IFifthStepProps {
  setImages: React.Dispatch<File[]>;
  submitData: (data: NewAdvertisementRequest) => void;
}

const ImagesStep: React.FunctionComponent<IFifthStepProps> = ({
  setImages,
  submitData,
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const fileArray = [...e.target.files];
    if (fileArray.length > 5) {
      console.log("more");
      setModalMessage("A maximum of 5 images are allowed.");
      onError(e);
      return;
    }
    for (const f of fileArray) {
      if (!(await ImageService.validateImageDimensions(f))) {
        setModalMessage(
          "Some images were too small. Image dimensions must be at least 600x600 pixels.",
        );
        onError(e);
        return;
      }
    }
    setImages(fileArray);
  };

  const onError = (e: React.ChangeEvent<HTMLInputElement>) => {
    onOpen();
    e.target.value = "";
  };

  const [modalMessage, setModalMessage] = useState<string>("");

  const { handleSubmit } = useForm<NewAdvertisementRequest>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <Flex
          height="420px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl isRequired>
            <FormLabel sx={formLabelStyles} htmlFor="image">
              Please select images to upload:
            </FormLabel>
            <Input
              id="image"
              name="image"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              borderColor="gray.500"
            ></Input>
            <FormHelperText>
              You can select up to 5 images. The size of all images must be at
              least 600x600.
              <br />
            </FormHelperText>
          </FormControl>
        </Flex>
        <Flex alignItems="center" marginTop="40px" flexDirection="column">
          <Button
            size="lg"
            type="submit"
            width="350px"
            height="40px"
            bgColor="brandGreen.500"
            textColor="white"
            _hover={{ background: "brandGreen.700" }}
          >
            Submit
          </Button>
        </Flex>
      </form>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image upload error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ImagesStep;
