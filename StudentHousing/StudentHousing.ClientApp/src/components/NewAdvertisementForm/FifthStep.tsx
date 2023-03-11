import { FormControl, Input } from "@chakra-ui/react";
import * as React from "react";

interface IFifthStepProps {}

const FifthStep: React.FunctionComponent<IFifthStepProps> = (props) => {
  return (
    <>
      <FormControl isRequired>
        <Input type="file" accept="image/*"></Input>
      </FormControl>
    </>
  );
};

export default FifthStep;
