import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { actualizarTarea, eliminarTarea } from "../../scripts/actions";
import { useTaskContext } from "../../hooks/useTaskContext";
import { showAlertDelete } from "../../utils/alerts";

const filterState = ["completado", "pendiente"];

const Task = ({
  id,
  index,
  nombre,
  descripcion,
  status,
  setInput,
  setOptions,
}) => {
  const [isChecked, setIsChecked] = useState(status == filterState[0]);
  const { dispatch } = useTaskContext();

  // useEffect(() => {
  //   const updateTask = async () => {
  //     const estado = isChecked ? filterState[0] : filterState[1];
  //     dispatch(await actualizarTarea(id, { estado }));
  //   };
  //   updateTask();
  // }, [isChecked]);

  const handleCheck = async () => {
    setIsChecked(!isChecked);
    const estado = !isChecked ? filterState[0] : filterState[1];
    dispatch(await actualizarTarea(id, { estado }));
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    setInput((prevInput) => ({ ...prevInput, nombre, descripcion }));
    setOptions((prevOptios) => ({ ...prevOptios, id, action: "edit" }));
  };

  const handleClickDelete = async (e) => {
    e.preventDefault();
    const response = await showAlertDelete(
      "Advertencia",
      "¿Estás seguro de eliminarla?",
      "warning",
      true
    );
    if (response.isConfirmed) {
      dispatch(await eliminarTarea(id));
    }
  };

  return (
    <ListItem>
      <Flex
        mb={1}
        borderRadius="md"
        bgColor={`${isChecked ? "#d1e7dd" : "rgba(248,249,250,1)"}`}
      >
        <Box w="100%" ml="3" pt={2} color="#495057">
          <Flex justifyContent="space-between" fontWeight="bold">
            <Checkbox
              me={1}
              textDecoration={`${isChecked && "line-through"}`}
              id={`task-${index}`}
              isChecked={isChecked}
              // checked={isChecked}
              onChange={handleCheck}
            >
              {nombre}
            </Checkbox>
            <Badge ml={1} bgColor="transparent">
              <Button
                bgColor="transparent"
                border="0"
                fontSize="0.8rem"
                h="25px"
                minW="1.5rem"
                p={0}
                variant="ghost"
                onClick={handleClickUpdate}
              >
                <EditIcon color="#0dcaf0" />
              </Button>
              <Button
                bgColor="transparent"
                border="0"
                fontSize="0.8rem"
                h="25px"
                minW="1.5rem"
                p={0}
                variant="ghost"
                onClick={handleClickDelete}
              >
                <DeleteIcon color="#dc3545" />
              </Button>
            </Badge>
          </Flex>
          <Text fontSize="md">{descripcion}</Text>
        </Box>
      </Flex>
    </ListItem>
  );
};

export default Task;
