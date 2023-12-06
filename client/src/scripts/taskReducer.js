import {
  LOGIN,
  LOGOUT,
  REGISTER,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_ALL_TASKS,
  ALL_TASKS,
  TASKS_PENDING,
  ERROR,
  CLEAR_LOGS,
  CLEAR_ALL,
} from "./type";

const taskReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: { ...state.user, ...action.payload?.user },
        token: action.payload?.token,
        isActive: true,
        error: "",
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: "",
        isActive: false,
        error: "",
        success: "",
      };
    case REGISTER:
      return {
        ...state,
        success: action.payload,
        error: "",
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: "",
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id == action.payload._id ? action.payload : task
        ),
        error: "",
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id != action.payload),
        error: "",
      };
    case DELETE_ALL_TASKS:
      return {
        ...state,
        tasks: [],
        countPending: 0,
        error: "",
      };
    case ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
        error: "",
      };
    case TASKS_PENDING:
      return {
        ...state,
        countPending: state.tasks?.filter((task) => task.isCompleted == false)
          .length,
        error: "",
      };
    case CLEAR_LOGS:
      return {
        ...state,
        error: "",
        success: "",
      };
    case CLEAR_ALL:
      return {
        ...state,
        user: {},
        token: "",
        isActive: false,
        tasks: [],
        countPending: 0,
        errors: "",
        success: "",
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
        success: "",
      };
    default:
      return state;
  }
};

export default taskReducer;
