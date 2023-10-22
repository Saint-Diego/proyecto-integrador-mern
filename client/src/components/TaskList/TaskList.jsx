import React, { useEffect } from "react";
import { Box, List } from "@chakra-ui/react";
import { consultarTareas } from "../../scripts/actions";
import { useTaskContext } from "../../hooks/useTaskContext";
import Task from "../Task/Task";

const TaskList = ({ setInput, setOptions }) => {
  const { todo, dispatch } = useTaskContext();

  useEffect(() => {
    const loadTasks = async () => {
      dispatch(await consultarTareas());
    };
    loadTasks();
  }, [dispatch]);

  return (
    <Box h="250px !important" overflow="auto" textAlign="start">
      <List pl={0}>
        {todo?.tasks?.map((task, index) => (
          <Task
            key={index}
            id={task?._id}
            index={index}
            title={task?.title}
            description={task?.description}
            isCompleted={task?.isCompleted}
            setInput={setInput}
            setOptions={setOptions}
          />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
