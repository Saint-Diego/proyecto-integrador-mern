import { Box, HStack, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";

const NavBar = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 768px)");
  return (
    <Box w={["sm", "lg", "3xl", "5xl", "7xl"]} position="relative">
      <HStack
        bgColor="blackAlpha.700"
        p={{ base: "1rem 3rem", md: "1rem 8rem" }}
        justifyContent="space-between"
      >
        <Logo size="3rem" />
        {isLargerThanMD ? <NavMenu /> : <NavMenuMobile />}
      </HStack>
    </Box>
  );
};

export default NavBar;
