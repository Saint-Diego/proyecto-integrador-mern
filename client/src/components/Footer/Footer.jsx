import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { showAlertDelete, showAlertWithTimer } from "../../utils/alerts";
import { eliminarTodo, filtrarTareas } from "../../actions";

const Footer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const tasksFilter = await filtrarTareas("pendiente");
      setCount(tasksFilter?.length);
    }
    loadData();
  }, []);

  const handleClickClearAll = async (e) => {
    e.preventDefault();
    const action = await showAlertDelete(
      "Advertencia",
      "¿Estás seguro de eliminar todo?",
      "warning",
      true
    );
    if (action.isConfirmed) {
      eliminarTodo();
      showAlertWithTimer("Tareas eliminadas correctamente", "", "success");
    }
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" w="100%">
      <Text m={0} color="#495057">{`Tienes ${count} tareas pendientes`}</Text>
      <Button colorScheme="red" onClick={handleClickClearAll}>
        Limpiar Todo
      </Button>
    </Flex>
  );
};

export default Footer;
