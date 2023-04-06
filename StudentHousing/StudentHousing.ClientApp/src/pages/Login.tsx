import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Image,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorAlert } from "../components/Alerts/ErrorAlert";
import { SuccessAlert } from "../components/Alerts/SuccessAlert";
import { LoginData } from "../formInterfaces/loginData";
import UserService from "../services/UserService";
import { formErrorMessageStyles } from "../styles/formErrorMessageStyles";
import { formLabelStyles } from "../styles/formLabelStyles";
import ApartmentBuilding1 from "../assets/apartment-building1.jpg";

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const initialFormValues: LoginData = {
    userName: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>();

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    mutateAsync: submitLogin,
  } = useMutation({
    mutationFn: async (data: LoginData) => {
      return await UserService.login(data);
    },
  });

  const submit = async (data: LoginData) => {
    const response = await submitLogin(data);
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
          <form onSubmit={handleSubmit(submit)}>
            <FormControl isInvalid={!!errors.userName}>
              <FormLabel sx={formLabelStyles} htmlFor="userName">
                Email:
              </FormLabel>
              <Input
                {...register("userName", {
                  required: "This field is required",
                })}
                id="username"
                borderColor="brandYellow.800"
                placeholder="johndoe@example.com"
                size="lg"
              ></Input>
              {errors.userName ? (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.userName.message}
                </FormErrorMessage>
              ) : (
                <Box visibility="hidden">Placeholder text</Box>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel sx={formLabelStyles} htmlFor="password">
                Password:
              </FormLabel>
              <Input
                id="password"
                {...register("password", {
                  required: "This field is required",
                })}
                type="password"
                borderColor="brandYellow.800"
                size="lg"
              ></Input>
              {errors.password ? (
                <FormErrorMessage sx={formErrorMessageStyles}>
                  {errors.password.message}
                </FormErrorMessage>
              ) : (
                <Box visibility="hidden">Placeholder text</Box>
              )}
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
                marginBottom="20px"
              >
                Login
              </Button>
              {isLoading && <div>Loading...</div>}
              {isError && error instanceof Error && (
                <ErrorAlert error={error}></ErrorAlert>
              )}
              {isSuccess && <SuccessAlert message="Login was successful!" />}
            </Flex>
          </form>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
