import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";

const Logo = ({ size }) => {
  return (
    <Link to="/dashboard">
      <Image
        src="https://res.cloudinary.com/dah19wrh1/image/upload/c_thumb,w_200,g_face/v1698532631/dev/assets/To-Do_icon.png"
        alt="thumbnail"
        width={size}
      />
    </Link>
  );
};

export default Logo;
