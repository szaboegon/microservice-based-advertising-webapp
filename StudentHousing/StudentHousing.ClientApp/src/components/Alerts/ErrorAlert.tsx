import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface IErrorAlertProps {
  error: Error;
}

export const ErrorAlert: React.FunctionComponent<IErrorAlertProps> = ({
  error,
}) => {
  return (
    <>
      <Alert status="error" maxWidth="600px">
        <AlertIcon />
        <AlertTitle>An error occured: </AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </>
  );
};
