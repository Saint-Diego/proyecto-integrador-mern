import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

const AlertSubmited = ({ title = "", description = "" }) => {
  return (
    <Alert
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{description}</AlertDescription>
    </Alert>
  );
};

export default AlertSubmited;
