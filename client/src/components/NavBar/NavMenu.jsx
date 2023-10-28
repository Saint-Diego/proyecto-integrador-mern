import React from "react";
import { Avatar, Flex, Tooltip } from "@chakra-ui/react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { logout } from "../../scripts/actions";
import NavLink from "./NavLink";

const NavMenu = ({ direction }) => {
  const { todo, dispatch } = useTaskContext();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(await logout());
  };

  return (
    <Flex gap="5rem" flexDir={direction}>
      {/* <NavLink href="#" text={todo?.user?.username} /> */}
      <Tooltip
        hasArrow
        label={todo?.user?.username}
        bg="gray.300"
        color="black"
      >
        <Avatar name={todo?.user?.username} />
      </Tooltip>
      <NavLink
        href="#"
        text="Logout"
        effect="outline"
        handleLogout={handleLogout}
      />
    </Flex>
  );
};

export default NavMenu;
