import { useReducer } from "react";
import taskReducer from "../scripts/taskReducer";
import { TaskContext } from "./createContextTask";

const initialState = {
  tasks: [],
  countPending: 0,
};

const ContextTask = ({ children }) => {
  const [todo, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ todo, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default ContextTask;
