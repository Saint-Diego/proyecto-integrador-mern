import axios from "axios";
import { url_api } from "../config/index";
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_ALL_TASKS,
  ALL_TASKS,
  TASKS_PENDING,
} from "./type";
import { showAlertWithTimer } from "../utils/alerts";

const icon = `<i class="bi bi-hand-thumbs-up text-primary"></i>`;

export const crearTarea = async (input) => {
  try {
    const { data } = await axios.post(`${url_api}/tareas`, input);
    showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: ADD_TASK,
      payload: data.task,
    };
  } catch (error) {
    console.log(error)
    showAlertWithTimer(`${error.message}`, "", "error");
  }
};

export const actualizarTarea = async (id, input) => {
  try {
    const { data } = await axios.put(`${url_api}/tareas/${id}`, input);
    if (!input?.estado)
      showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: UPDATE_TASK,
      payload: data.task,
    };
  } catch (error) {
    showAlertWithTimer(`${error.message}`, "", "error");
  }
};

export const eliminarTarea = async (id) => {
  try {
    const { data } = await axios.delete(`${url_api}/tareas/${id}`);
    showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: DELETE_TASK,
      payload: id,
    };
  } catch (error) {
    showAlertWithTimer(`${error.message}`, "", "error");
  }
};

export const eliminarTodo = async () => {
  try {
    const { data } = await axios.delete(`${url_api}/tareas`);
    showAlertWithTimer(`${icon}\n${data.message}`, "", "success");
    return {
      type: DELETE_ALL_TASKS,
    };
  } catch (error) {
    showAlertWithTimer(`${error.message}`, "", "error");
  }
};

export const consultarTareas = async () => {
  try {
    const { data } = await axios(`${url_api}/tareas`);
    return {
      type: ALL_TASKS,
      payload: data,
    };
  } catch (error) {
    showAlertWithTimer(`${error.message}`, "", "error");
  }
};

export const obtenerTareasPendientes = () => {
  return {
    type: TASKS_PENDING,
  };
};
