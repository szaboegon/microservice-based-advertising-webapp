import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { formLabelStyles } from "../styles/formLabelStyles";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState();
  const onSubmit = () => {};
  return (
    <>
      <Box height="900px">
        <Flex>
          <form onSubmit={onSubmit}>
            <FormControl isRequired>
              <FormLabel sx={formLabelStyles} htmlFor="email">
                Email:
              </FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                borderColor="brandYellow.800"
                placeholder="johndoe@example.com"
                required
                size="lg"
              ></Input>
            </FormControl>
            <FormControl isRequired>
              <FormLabel sx={formLabelStyles} htmlFor="password">
                Password:
              </FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                borderColor="brandYellow.800"
                required
                size="lg"
              ></Input>
            </FormControl>
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
                Login
              </Button>
            </Flex>
          </form>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
