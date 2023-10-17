import { useContext } from "react";
import { TaskContext } from "../context/createContextTask";

export const useTaskContext = () => {
  return useContext(TaskContext);
};