import { useReducer } from "react";
import useLocalStorage from "use-local-storage";
import taskReducer from "../scripts/taskReducer";
import { store } from "../config/store";
import { TaskContext } from "./createContextTask";

const initialState = {
  user: {},
  token: "",
  isActive: false,
  tasks: [],
  countPending: 0,
  errors: "",
  success: "",
};

const ContextTask = ({ children }) => {
  const [todo, dispatch] = useReducer(taskReducer, initialState);
  const [user, setUser] = useLocalStorage("user", JSON.parse(store));

  return (
    <TaskContext.Provider value={{ todo, user, setUser, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default ContextTask;
