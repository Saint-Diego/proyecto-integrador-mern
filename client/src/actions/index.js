import axios from "axios";
import { url_api } from "../config/index";

export const crearTarea = async (input) => {
  try {
    const { data } = await axios.post(`${url_api}/tareas`, input);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const actualizarTarea = async (id, input) => {
  try {
    const { data } = await axios.put(`${url_api}/tareas/${id}`, input);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarTarea = async (id) => {
  try {
    const { data } = await axios.delete(`${url_api}/tareas/${id}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarTodo = async () => {
  try {
    const { data } = await axios.delete(`${url_api}/tareas`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const consultarTareas = async () => {
  try {
    const { data } = await axios(`${url_api}/tareas`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const filtrarTareas = async (state) => {
  try {
    const { data } = await axios(`${url_api}/tareas?state=${state}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
