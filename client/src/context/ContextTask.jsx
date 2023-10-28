import { useReducer } from "react";
import taskReducer from "../scripts/taskReducer";
import { TaskContext } from "./createContextTask";

const initialState = {
  user: {},
  isActive: false,
  tasks: [],
  countPending: 0,
  errors: "",
  success: "",
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
