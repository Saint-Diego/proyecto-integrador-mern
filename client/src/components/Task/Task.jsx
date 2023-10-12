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
import { actualizarTarea, eliminarTarea } from "../../actions";
import { showAlertDelete, showAlertWithTimer } from "../../utils/alerts";

// const joinTitle = (value) => {
//   return value.toLowerCase().split(" ").join("-");
// };

const Task = ({
  id,
  index,
  title,
  description,
  status,
  setInput,
  setOptions,
}) => {
  const [isChecked, setIsChecked] = useState(status);

  useEffect(() => {
    actualizarTarea(id, { status: isChecked });
  }, [isChecked]);

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleClickUpdate = (e) => {
    e.preventDefault();
    setInput((prevInput) => ({ ...prevInput, title, description }));
    setOptions((prevOptios) => ({ ...prevOptios, id, action: "edit" }));
  };

  const handleClickDelete = async (e) => {
    e.preventDefault();
    const action = await showAlertDelete(
      "Advertencia",
      "¿Estás seguro de eliminarla?",
      "warning",
      true
    );
    if (action.isConfirmed) {
      eliminarTarea(id);
      showAlertWithTimer(
        `<i class="bi bi-hand-thumbs-up text-primary"></i>
      Tarea eliminada correctamente`,
        "",
        "success"
      );
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
              checked={isChecked}
              onChange={handleCheck}
            >
              {title}
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
          <Text fontSize="md">{description}</Text>
        </Box>
      </Flex>
    </ListItem>
  );
};

export default Task;
