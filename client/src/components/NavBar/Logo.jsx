import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";

const Logo = ({ size }) => {
  return (
    <Link to="/">
      <Image src={"../src/assets/To-Do-icon.png"} alt="thumbnail" width={size} />
    </Link>
  );
};

export default Logo;
