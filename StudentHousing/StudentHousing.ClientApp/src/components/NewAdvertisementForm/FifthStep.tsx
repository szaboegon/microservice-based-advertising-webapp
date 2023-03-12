import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import * as React from "react";
import { NewAdvertisementFormData } from "../../formInterfaces/newAdvertisementFormData";
import { formLabelStyles } from "../../styles/formLabelStyles";

interface IFifthStepProps {
  setImage: React.Dispatch<File>;
  handleSubmit: (e: React.FormEvent<HTMLElement>) => Promise<void>;
}

const FifthStep: React.FunctionComponent<IFifthStepProps> = ({
  setImage,
  handleSubmit,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    if (file) {
      setImage(file);
      alert(file);
    }
  };

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
            Submit
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default FifthStep;
