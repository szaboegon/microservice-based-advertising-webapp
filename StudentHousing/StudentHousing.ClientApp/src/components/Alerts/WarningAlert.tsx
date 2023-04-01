import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface IWarningAlertProps {
  message: string;
}

export const WarningAlert: React.FunctionComponent<IWarningAlertProps> = ({
  message,
}) => {
  return (
    <>
      <Alert status="warning" maxWidth="600px">
        <AlertIcon />
        <AlertTitle>Warning: </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </>
  );
};
