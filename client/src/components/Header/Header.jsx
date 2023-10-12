import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box py={2} bgColor="blackAlpha.50">
      <Heading size="3xl">Lista de Tareas</Heading>
    </Box>
  )
}

export default Header;