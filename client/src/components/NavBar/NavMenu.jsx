import React from "react";
import { Avatar, Flex, Tooltip } from "@chakra-ui/react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { logout } from "../../scripts/actions";
import NavLink from "./NavLink";

const NavMenu = ({ direction }) => {
  const { user, setUser, dispatch } = useTaskContext();

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(await logout());
    setUser({});
  };

  return (
    <Flex gap="5rem" flexDir={direction}>
      {/* <NavLink href="#" text={todo?.user?.username} /> */}
      <Tooltip
        hasArrow
        label={user?.username}
        bg="gray.300"
        color="black"
      >
        <Avatar name={user?.username} />
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
