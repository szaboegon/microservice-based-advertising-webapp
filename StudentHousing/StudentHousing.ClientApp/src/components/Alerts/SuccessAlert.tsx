import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface ISuccessAlertProps {
  message: string;
}

export const SuccessAlert: React.FunctionComponent<ISuccessAlertProps> = ({
  message,
}) => {
  return (
    <>
      <Alert status="success" maxWidth="600px">
        <AlertIcon />
        <AlertTitle>Success: </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </>
  );
};
