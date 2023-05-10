import {
  Button,
  Flex,
  FormControl,
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
import { NewAdvertisementFormData } from "../../../models/formInterfaces/newAdvertisementFormData";
import ImageService from "../../../services/ImageService";
import { formLabelStyles } from "../../../styles/formLabelStyles";

interface IFifthStepProps {
  setImage: React.Dispatch<File>;
  submitData: (data: NewAdvertisementFormData) => void;
}

const FifthStep: React.FunctionComponent<IFifthStepProps> = ({
  setImage,
  submitData,
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (!(file && (await ImageService.validateImageDimensions(file)))) {
      onOpen();
      e.target.value = "";
    }

    if (file) {
      setImage(file);
    }
  };

  const { handleSubmit } = useForm<NewAdvertisementFormData>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <Flex
          height="450px"
          width="600px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <FormControl isRequired>
            <FormLabel sx={formLabelStyles} htmlFor="image">
              Please select an image:
            </FormLabel>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              borderColor="brandYellow.800"
            ></Input>
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
          <ModalHeader>Image size error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Image is too small. Image dimensions must be at least 600x600
            pixels.
          </ModalBody>
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

export default FifthStep;