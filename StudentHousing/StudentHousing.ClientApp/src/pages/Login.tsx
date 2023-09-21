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
} from "@chakra-ui/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ErrorAlert } from "../components/alerts/ErrorAlert";
import { SuccessAlert } from "../components/alerts/SuccessAlert";
import { LoginRequest } from "../models/forms/loginRequest";
import UserService from "../services/userService";
import { formErrorMessageStyles } from "../styles/formErrorMessageStyles";
import { formLabelStyles } from "../styles/formLabelStyles";
import ApartmentBuilding1 from "../assets/images/apartment-building1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { placeholderStyles } from "../styles/placeholderStyles";
import { AxiosError } from "axios";
import { useEffect } from "react";
import SearchParamsHelper from "../helpers/searchParamsHelper";

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
          <Card
            justifyContent="center"
            alignItems="center"
            paddingX="30px"
            paddingY="40px"
            variant="elevated"
          >
            <form onSubmit={handleSubmit(submit)}>
              <FormControl maxWidth="400px" isInvalid={!!errors.userName}>
                <FormLabel sx={formLabelStyles} htmlFor="userName">
                  Username:
                </FormLabel>
                <Input
                  {...register("userName", {
                    required: "This field is required",
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
                Login
              </Button>
            </form>
            <Link to="/register">Don't have an account yet?</Link>
            <Flex>
              {isLoading && <Spinner />}
              {isError && error instanceof AxiosError && (
                <ErrorAlert error={error}></ErrorAlert>
              )}
              {isSuccess && <SuccessAlert message="Login was successful!" />}
            </Flex>
          </Card>
        </Flex>
      </Box>
    </>
  );
};
