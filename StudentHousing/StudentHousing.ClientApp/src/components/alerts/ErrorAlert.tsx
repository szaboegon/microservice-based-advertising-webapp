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

  const clientErrorRegExp = /^4\d{2}$/

  return (
    <>
      <Alert status="error" maxWidth={maxWidth ? maxWidth : "600px"}>
        <AlertIcon />
        <AlertTitle>Error: </AlertTitle>
        <AlertDescription>
          {error instanceof AxiosError &&
          error.status &&
          clientErrorRegExp.test(error.status.toString())  &&
          error.response?.data &&
          typeof error.response.data == "string"
            ? error.response?.data
            : error.message}
        </AlertDescription>
      </Alert>
    </>
  );
};
