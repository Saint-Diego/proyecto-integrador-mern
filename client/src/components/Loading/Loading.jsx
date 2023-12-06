import React from "react";
import { Center, CircularProgress } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center h="100vh">
      <CircularProgress isIndeterminate color="gray.300" size="120px" />
    </Center>
  );
};

export default Loading;
