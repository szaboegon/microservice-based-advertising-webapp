import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import * as React from "react";

interface IErrorAlertProps {
  description: string;
}

const ErrorAlert: React.FunctionComponent<IErrorAlertProps> = ({
  description,
}) => {
  return (
    <>
      <Alert status="error" marginBottom="10px">
        <AlertIcon />
        <AlertTitle>{description}</AlertTitle>
      </Alert>
    </>
  );
};

export default ErrorAlert;
