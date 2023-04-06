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

interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  /*const initialFormValues: LoginData = {
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
    await submitLogin(data);
  };*/

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
          <form></form>
        </Flex>
      </Box>
    </>
  );
};

export default Register;
