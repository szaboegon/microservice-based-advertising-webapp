import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Image,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorAlert } from "../alerts/ErrorAlert";
import { SuccessAlert } from "../alerts/SuccessAlert";
import UserService from "../../services/userService";
import { formErrorMessageStyles } from "../../styles/formErrorMessageStyles";
import { formLabelStyles } from "../../styles/formLabelStyles";
import ApartmentBuilding1 from "../../assets/images/apartment-building1.jpg";
import { Link } from "react-router-dom";
import { RegistrationRequest } from "../../models/forms/registrationRequest";
import { placeholderStyles } from "../../styles/placeholderStyles";

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
          flexDirection="column"
        >
          <form onSubmit={handleSubmit(submit)}>
            <Flex flexDirection="column" alignItems="center" maxWidth="400px">
              <HStack>
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
                    borderColor="brandYellow.800"
                    size="lg"
                  ></Input>
                  {errors.firstName ? (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.firstName.message}
                    </FormErrorMessage>
                  ) : (
                    <Box sx={placeholderStyles}>Placeholder text</Box>
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
                    borderColor="brandYellow.800"
                    size="lg"
                  ></Input>
                  {errors.lastName ? (
                    <FormErrorMessage sx={formErrorMessageStyles}>
                      {errors.lastName.message}
                    </FormErrorMessage>
                  ) : (
                    <Box sx={placeholderStyles}>Placeholder text</Box>
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
                  borderColor="brandYellow.800"
                  size="lg"
                ></Input>
                {errors.userName ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.userName.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
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
                  borderColor="brandYellow.800"
                  type="text"
                  size="lg"
                ></Input>
                {errors.email ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.email.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
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
                  borderColor="brandYellow.800"
                  size="lg"
                ></Input>
                {errors.password ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.password.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
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
                  borderColor="brandYellow.800"
                  type="password"
                  size="lg"
                ></Input>
                {errors.confirmPassword ? (
                  <FormErrorMessage sx={formErrorMessageStyles}>
                    {errors.confirmPassword.message}
                  </FormErrorMessage>
                ) : (
                  <Box sx={placeholderStyles}>Placeholder text</Box>
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
                marginTop="10px"
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
        </Flex>
      </Box>
    </>
  );
};

export default Register;
