import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

const NavLink = ({ href, text, effect = "ghost", handleLogout }) => {
  return (
    <Box>
      <Link href={href}>
        <Button
          variant={effect}
          fontSize="lg"
          color="whiteAlpha.900"
          colorScheme="whiteAlpha"
          onClick={handleLogout}
        >
          {text}
        </Button>
      </Link>
    </Box>
  );
};

export default NavLink;
