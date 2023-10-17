const { ObjectId } = require("mongodb");
const { validationResult } = require("express-validator");
const TaskModel = require("../model/task");
const isObjectEmpty = require("../utils/isObjectEmpty");

const filters = ["completado", "pendiente"];

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const { nombre, descripcion } = req.body;
    const taskFinded = await TaskModel.findOne({ nombre });
    if (taskFinded)
      return res.status(400).json({
        error: `Tarea con nombre ${nombre}, ya se encuentra registrada`,
      });
    const newTask = new TaskModel({ nombre, descripcion });
    const taskCreated = await newTask.save(req.body);
    res
      .status(201)
      .json({ msg: "Tarea guardada correctamente", task: taskCreated });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskFinded = await TaskModel.findByIdAndUpdate(new ObjectId(id), {
      ...req.body,
    });
    if (!taskFinded)
      return res.status(404).json({ error: `Tarea con ID ${id} no existe` });
    const taskUpdated = await TaskModel.findById(new ObjectId(id));
    res
      .status(200)
      .json({ msg: "Tarea actualizada correctamente", task: taskUpdated });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskDeleted = await TaskModel.findByIdAndDelete(new ObjectId(id));
    if (!taskDeleted)
      return res.status(404).json({ error: `Tarea con ID ${id} no existe` });
    res.status(200).json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const task = await TaskModel.deleteMany({});
    if (task.deletedCount <= 0)
      return res.status(400).json({ error: `Error al eliminar las tareas` });
    res.status(200).json({ msg: "Tareas eliminadas correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getAllTasks = async (req, res) => {
  let tasks;
  try {
    if (isObjectEmpty(req.query)) tasks = await TaskModel.find({});
    else {
      const { state } = req.query;
      if (state) {
        if (filters.includes(state))
          tasks = await TaskModel.find({ estado: state });
        else
          return res.status(400).json({ error: "Valor de consulta inválido" });
      } else
        return res
          .status(400)
          .json({ error: "Parámetro de consulta inválido" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error interno del servidor", status: "error" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(new ObjectId(id));
    if (!task)
      return res.status(404).json({ error: `Tarea con ID ${id} no existe` });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
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
