import React, { useState } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import NavMenu from "./NavMenu";

const NavMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        colorScheme="blackAlpha"
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        boxSize="2.5rem"
        size="2rem"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Box
        p="1.5rem 5rem"
        m="0 !important"
        bgColor="blackAlpha.800"
        position="absolute"
        top="100%"
        left={0}
        w="full"
        zIndex={1}
        display={isOpen ? "flex" : "none"}
      >
        <NavMenu direction="column" />
      </Box>
    </>
  );
};

export default NavMenuMobile;
