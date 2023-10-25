import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_ALL_TASKS,
  ALL_TASKS,
  TASKS_PENDING,
} from "./type";

const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id == action.payload._id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id != action.payload),
      };
    case DELETE_ALL_TASKS:
      return {
        ...state,
        tasks: [],
        countPending: 0,
      };
    case ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case TASKS_PENDING:
      return {
        ...state,
        countPending: state.tasks.filter((task) => task.isCompleted == false)
          .length,
      };
    default:
      return state;
  }
};

export default taskReducer;
