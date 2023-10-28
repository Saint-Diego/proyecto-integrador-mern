import { Heading, Stack, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Stack h="100vh">
      <Heading>Error 404</Heading>
      <Heading size="md">Página no encontrada</Heading>
      <Text>
        Lo sentimos no podemos encontrar la ruta que solicitaste, por favor
        intenta verificar bien la dirección
      </Text>
    </Stack>
  );
};

export default NotFound;
