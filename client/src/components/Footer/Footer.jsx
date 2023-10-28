import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { eliminarTodo, obtenerTareasPendientes } from "../../scripts/actions";
import { useTaskContext } from "../../hooks/useTaskContext";
import { showAlertDelete } from "../../utils/alerts";

const Footer = () => {
  const { todo, dispatch } = useTaskContext();

  useEffect(() => {
    dispatch(obtenerTareasPendientes());
  }, [todo?.tasks, dispatch]);

  const handleClickClearAll = async (e) => {
    e.preventDefault();
    const action = await showAlertDelete(
      "Advertencia",
      "¿Estás seguro de eliminar todo?",
      "warning",
      true
    );
    if (action.isConfirmed) {
      dispatch(await eliminarTodo());
    }
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" w="100%">
      <Text m={0} color="#495057">{`Tienes ${todo?.countPending} tareas pendientes`}</Text>
      <Button colorScheme="red" border="none" onClick={handleClickClearAll}>
        Limpiar Todo
      </Button>
    </Flex>
  );
};

export default Footer;
