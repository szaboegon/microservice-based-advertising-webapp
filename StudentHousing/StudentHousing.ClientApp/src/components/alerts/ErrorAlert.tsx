import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { AxiosError } from "axios";

interface IErrorAlertProps {
  error: Error;
  maxWidth?: string;
}

export const ErrorAlert: React.FunctionComponent<IErrorAlertProps> = ({
  error,
  maxWidth,
}) => {
  return (
    <>
      <Alert status="error" maxWidth={maxWidth ? maxWidth : "600px"}>
        <AlertIcon />
        <AlertTitle>An error occured: </AlertTitle>
        <AlertDescription>
          {error instanceof AxiosError &&
          error.response?.data &&
          typeof error.response.data == "string"
            ? error.response?.data
            : error.message}
        </AlertDescription>
      </Alert>
    </>
  );
};
