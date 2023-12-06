import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  HStack,
  Card,
  Heading,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorAlert } from "../components/shared/alerts/ErrorAlert";
import { SuccessAlert } from "../components/shared/alerts/SuccessAlert";
import UserService from "../services/userService";
import { formErrorMessageStyles } from "../styles/formErrorMessageStyles";
import { formLabelStyles } from "../styles/formLabelStyles";
import { Link } from "react-router-dom";
import { RegistrationRequest } from "../models/requests/registrationRequest";
import { formTitleStyles } from "../styles/formTitleStyles";
import { NAVBAR_HEIGHT } from "../assets/literals/constants";
import BgImage from "../assets/images/large-bg.jpg";

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const initialFormValues: RegistrationRequest = {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  };

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<RegistrationRequest>();

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    mutateAsync: submitRegistration,
  } = useMutation({
    mutationFn: async (data: RegistrationRequest) => {
      return await UserService.register(data);
    },
  });

  const submit = async (data: RegistrationRequest) => {
    var response = await submitRegistration(data);
  };

  return (
    <>
      <Box
        width="100%"
        height={`calc(100vh - ${NAVBAR_HEIGHT})`}
        position="relative"
        backgroundImage={BgImage}
        backgroundSize="cover"
        backgroundPosition="center"
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
          flexDirection="column"
        >
          <Card
            justifyContent="center"
            alignItems="center"
            padding="40px"
            variant="elevated"
          >
            <Heading sx={formTitleStyles}>Register an account</Heading>
            <form onSubmit={handleSubmit(submit)}>
              <Flex
                flexDirection="column"
                alignItems="center"
                maxWidth="400px"
                gap="10px"
              >
                <HStack alignItems="start">
                  <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel sx={formLabelStyles} htmlFor="firstName">
                      First name:
                    </FormLabel>
                    <Input
                      {...register("firstName", {
                        required: "This field is required",
                        pattern: {
                          value: /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$/,
                          message: "Invalid name",
                        },
                      })}
                      id="firstName"
                      borderColor="gray.500"
                      size="lg"
                    ></Input>
                    {errors.firstName && (
                      <FormErrorMessage sx={formErrorMessageStyles}>
                        {errors.firstName.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel sx={formLabelStyles} htmlFor="lastName">
                      Last name:
                    </FormLabel>
                    <Input
                      {...register("lastName", {
                        required: "This field is required",
                        pattern: {
                          value: /^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\\s-]+$/,
                          message: "Invalid name",
                        },
                      })}
                      id="lastName"
                      borderColor="gray.500"
                      size="lg"
                    ></Input>
                    {errors.lastName && (
                      <FormErrorMessage sx={formErrorMessageStyles}>
                        {errors.lastName.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </HStack>
                <FormControl isInvalid={!!errors.userName}>
                  <FormLabel sx={formLabelStyles} htmlFor="userName">
                    Username:
                  </FormLabel>
                  <Input
                    {...register("userName", {
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters long.",
                      },
                      maxLength: {
                        value: 20,
                        message: "Username must be at max 20 characters long.",
                      },
                    })}
                    id="userName"
                    borderColor="gray.500"
                    size="lg"
                  ></Input>
                  {errors.userName && (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.userName.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel sx={formLabelStyles} htmlFor="email">
                    Email:
                  </FormLabel>
                  <Input
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email.",
                      },
                    })}
                    id="email"
                    borderColor="gray.500"
                    type="text"
                    size="lg"
                  ></Input>
                  {errors.email && (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.email.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <FormLabel sx={formLabelStyles} htmlFor="password">
                    Password:
                  </FormLabel>
                  <Input
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long.",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
                        message:
                          "Password must contain at least one uppercase letter, lowercase letter, and number",
                      },
                    })}
                    id="password"
                    type="password"
                    borderColor="gray.500"
                    size="lg"
                  ></Input>
                  {errors.password && (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPassword}>
                  <FormLabel sx={formLabelStyles} htmlFor="confirmPassword">
                    Confirm password:
                  </FormLabel>
                  <Input
                    {...register("confirmPassword", {
                      required: "This field is required",
                      validate: (val: string) => {
                        if (watch("password") != val) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                    id="confirmPassword"
                    borderColor="gray.500"
                    type="password"
                    size="lg"
                  ></Input>
                  {errors.confirmPassword && (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.confirmPassword.message}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  size="lg"
                  type="submit"
                  width="350px"
                  height="40px"
                  bgColor="brandGreen.500"
                  textColor="white"
                  _hover={{ background: "brandGreen.700" }}
                  marginBottom="20px"
                  marginTop="20px"
                >
                  Register
                </Button>
              </Flex>
            </form>
            <Link to="/login">Already registered? Login</Link>
            <Flex>
              {isLoading && <Spinner />}
              {isError && error instanceof Error && (
                <ErrorAlert error={error}></ErrorAlert>
              )}
              {isSuccess && (
                <SuccessAlert message="Registration was successful!" />
              )}
            </Flex>
          </Card>
        </Flex>
      </Box>
    </>
  );
};

export default Register;
