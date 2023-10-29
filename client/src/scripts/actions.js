import axios from "axios";
import { url_api } from "../config/index";
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
} from "./type";
import { showAlertToast, showAlertWithTimer } from "../utils/alerts";

const icon = `<i class="bi bi-hand-thumbs-up text-primary"></i>`;

// Funciones para consumir los end-points de user
export const login = async (input) => {
  try {
    const { data } = await axios.post(`${url_api}/user/login`, input);
    await showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: LOGIN,
      payload: data,
    };
  } catch ({ response }) {
    return {
      type: ERROR,
      payload: response.data?.error,
    };
  }
};

export const logout = async () => {
  try {
    await showAlertToast("Usted está saliendo de la aplicación", "info");
    return {
      type: LOGOUT,
    };
  } catch (error) {
    await showAlertWithTimer(`${error.message}`, "", "error");
  }
};

export const register = async (input) => {
  try {
    const { data } = await axios.post(`${url_api}/user/register`, input);
    // await showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: REGISTER,
      payload: data.message,
    };
  } catch ({ response }) {
    return {
      type: ERROR,
      payload: response.data?.error,
    };
  }
};

export const consultarTareasPorUsuario = async (id) => {
  try {
    const { data } = await axios(`${url_api}/user?id=${id}`);
    return {
      type: ALL_TASKS,
      payload: data,
    };
  } catch ({ response }) {
    await showAlertWithTimer(`${response.data?.error}`, "", "error");
  }
};

// Funciones para consumir los end-points de task
export const crearTarea = async (input) => {
  try {
    const { data } = await axios.post(`${url_api}/tareas`, input);
    await showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: ADD_TASK,
      payload: data.task,
    };
  } catch ({ response }) {
    await showAlertWithTimer(`${response.data?.error}`, "", "error");
    return {
      type: ERROR,
      payload: response.data?.error,
    };
  }
};

export const actualizarTarea = async (id, input) => {
  try {
    const { data } = await axios.put(`${url_api}/tareas/${id}`, input);
    if (typeof input?.isCompleted == "undefined")
      await showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: UPDATE_TASK,
      payload: data.task,
    };
  } catch ({ response }) {
    await showAlertWithTimer(`${response.data?.error}`, "", "error");
  }
};

export const eliminarTarea = async (id) => {
  try {
    const { data } = await axios.delete(`${url_api}/tareas/${id}`);
    await showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: DELETE_TASK,
      payload: id,
    };
  } catch ({ response }) {
    await showAlertWithTimer(`${response.data?.error}`, "", "error");
  }
};

export const eliminarTodo = async () => {
  try {
    const { data } = await axios.delete(`${url_api}/tareas`);
    await showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: DELETE_ALL_TASKS,
    };
  } catch ({ response }) {
    await showAlertWithTimer(`${response.data?.error}`, "", "error");
  }
};

export const consultarTareas = async () => {
  try {
    const { data } = await axios(`${url_api}/tareas`);
    return {
      type: ALL_TASKS,
      payload: data,
    };
  } catch ({ response }) {
    await showAlertWithTimer(`${response.data?.error}`, "", "error");
  }
};

// Otras funciones
export const obtenerTareasPendientes = () => {
  return {
    type: TASKS_PENDING,
  };
};

export const clearLogs = () => {
  return {
    type: CLEAR_LOGS,
  };
};

export const clearAll = () => {
  return {
    type: CLEAR_ALL,
  };
};
