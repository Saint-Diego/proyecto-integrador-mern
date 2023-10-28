import React from "react";

const AlertLogout = () => {
  const { onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Alert status="success">
      <AlertIcon />
      <Box>
        <AlertTitle>Exitoso!</AlertTitle>
        <AlertDescription>Usted esta saliendo de la aplicación</AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
};

export default AlertLogout;
