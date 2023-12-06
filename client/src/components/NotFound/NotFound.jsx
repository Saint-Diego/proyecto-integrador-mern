import React from "react";
import { Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Stack h="100vh" py={10}>
      <Heading>Error 404</Heading>
      <Heading size="md">Página no encontrada</Heading>
      <Text>
        Lo sentimos no podemos encontrar la ruta que solicitaste, por favor
        intenta verificar bien la dirección
      </Text>
      <Flex justifyContent="center">
        <Link
          href="/"
          color="gray"
          _hover={{ textDecoration: "none", color: "#535bf2" }}
        >
          Inicio
        </Link>
      </Flex>
    </Stack>
  );
};

export default NotFound;
