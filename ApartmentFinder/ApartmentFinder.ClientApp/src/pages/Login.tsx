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
  Card,
  Heading,
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorAlert } from "../components/alerts/ErrorAlert";
import { SuccessAlert } from "../components/alerts/SuccessAlert";
import { LoginRequest } from "../models/requests/loginRequest";
import UserService from "../services/userService";
import { formErrorMessageStyles } from "../styles/formErrorMessageStyles";
import { formLabelStyles } from "../styles/formLabelStyles";
import ApartmentBuilding1 from "../assets/images/apartment-building1.jpg";
import BgImage from "../assets/images/large-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { placeholderStyles } from "../styles/placeholderStyles";
import { AxiosError } from "axios";
import { useEffect } from "react";
import SearchParamsHelper from "../helpers/searchParamsHelper";
import { formTitleStyles } from "../styles/formTitleStyles";
import { NAVBAR_HEIGHT } from "../assets/literals/constants";

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginRequest>();

  const {
    isSuccess,
    isLoading,
    isError,
    error,
    mutateAsync: submitLogin,
  } = useMutation({
    mutationFn: async (data: LoginRequest) => {
      return await UserService.login(data);
    },
  });

  const navigate = useNavigate();
  const submit = async (data: LoginRequest) => {
    const response = await submitLogin(data).then(() => {
      let searchParams = SearchParamsHelper.addPaginationParams(
        new URLSearchParams(),
      );
      navigate("/search?" + searchParams, {});
      window.location.reload();
    });
  };

  useEffect(() => {
    if (UserService.getCurrentUser()) {
      navigate("/");
    }
  });

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
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Card
            justifyContent="center"
            alignItems="center"
            padding="40px"
            variant="elevated"
          >
            <Heading sx={formTitleStyles}>Sign In</Heading>
            <form onSubmit={handleSubmit(submit)}>
              <Flex flexDirection="column" alignItems="center" gap="10px">
                <FormControl maxWidth="400px" isInvalid={!!errors.userName}>
                  <FormLabel sx={formLabelStyles} htmlFor="userName">
                    Username:
                  </FormLabel>
                  <Input
                    {...register("userName", {
                      required: "This field is required",
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
                <FormControl maxWidth="400px" isInvalid={!!errors.password}>
                  <FormLabel sx={formLabelStyles} htmlFor="password">
                    Password:
                  </FormLabel>
                  <Input
                    id="password"
                    {...register("password", {
                      required: "This field is required",
                    })}
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
                  Login
                </Button>
              </Flex>
            </form>
            <Link to="/register">Don't have an account yet?</Link>
            <Flex>
              {isLoading && <Spinner />}
              {isError && error instanceof AxiosError && (
                <ErrorAlert error={error} maxWidth="350px"></ErrorAlert>
              )}
              {isSuccess && <SuccessAlert message="Login was successful!" />}
            </Flex>
          </Card>
        </Flex>
      </Box>
    </>
  );
};
