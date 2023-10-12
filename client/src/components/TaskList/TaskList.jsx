import React, { useEffect, useState } from "react";
import { Box, List } from "@chakra-ui/react";
import { consultarTareas } from "../../actions";
import Task from "../Task/Task";

const TaskList = ({ setInput, setOptions }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const cargarData = async () => {
      const allTasks = await consultarTareas();
      setTasks([...allTasks]);
    };
    cargarData();
  }, []);

  return (
    <Box h="250px !important" overflow="auto" textAlign="start">
      <List pl={0}>
        {tasks?.map((task, index) => (
          <Task
            key={index}
            id={task?.id}
            index={index}
            title={task?.title}
            description={task?.description}
            status={task?.status}
            setInput={setInput}
            setOptions={setOptions}
          />
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
