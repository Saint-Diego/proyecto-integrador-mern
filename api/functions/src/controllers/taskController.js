const { validationResult } = require("express-validator");
const TaskModel = require("../model/task");
const isObjectEmpty = require("../utils/isObjectEmpty");

const filters = ["completado", "pendiente"];

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error("Todos los campos son obligatorios");
  }
  try {
    const { nombre, descripcion } = req.body;
    const taskFinded = await TaskModel.findOne({ nombre });
    if (taskFinded)
      throw new Error(`Tarea con nombre ${nombre}, ya se encuentra registrada`);
    const newTask = new TaskModel({ nombre, descripcion });
    const taskCreated = await newTask.save(req.body);
    res
      .status(201)
      .json({ message: "Tarea guardada correctamente", task: taskCreated });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskUpdated = await TaskModel.findByIdAndUpdate(
      id.toString(),
      {
        ...req.body,
      },
      { new: true }
    );
    if (!taskUpdated) throw new Error(`Tarea con ID ${id} no existe`);
    res
      .status(200)
      .json({ message: "Tarea actualizada correctamente", task: taskUpdated });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskDeleted = await TaskModel.findByIdAndDelete(id.toString());
    if (!taskDeleted) throw new Error(`Tarea con ID ${id} no existe`);
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.deleteMany({});
    if (tasks.deletedCount <= 0)
      throw new Error("Error al eliminar las tareas");
    res.status(200).json({ message: "Tareas eliminadas correctamente" });
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

const getAllTasks = async (req, res) => {
  let tasks;
  try {
    if (isObjectEmpty(req.query)) tasks = await TaskModel.find();
    else {
      const { state } = req.query;
      if (state) {
        if (filters.includes(state))
          tasks = await TaskModel.find({ estado: state });
        else throw new Error("Valor de consulta inválido");
      } else throw new Error("Parámetro de consulta inválido");
    }
    res.status(200).json(tasks);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const taskFinded = await TaskModel.findById(id.toString());
    if (!taskFinded) throw new Error(`Tarea con ID ${id} no existe`);
    res.status(200).json(taskFinded);
  } catch (error) {
    throw new Error("Error interno del servidor");
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  getAllTasks,
  getTaskById,
};
