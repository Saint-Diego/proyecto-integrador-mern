require("dotenv").config();
const { ObjectId } = require("mongodb");
const { validationResult } = require("express-validator");
const TaskModel = require("../model/task");
const isObjectEmpty = require("../utils/isObjectEmpty");

const filters = ["completado", "pendiente"];

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { nombre, descripcion } = req.body;
    const newTask = new TaskModel({ nombre, descripcion });
    await newTask.save(req.body);
    res.status(201).json({ msg: "Tarea guardada correctamente" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.updateOne(
      { _id: new ObjectId(id) },
      { ...req.body }
    );
    if (task.modifiedCount === 0)
      return res.status(400).json({ error: `Tarea con ID ${id} no existe` });
    res.status(200).json({ msg: "Tarea actualizada correctamente" });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.deleteOne({ _id: new ObjectId(id) });
    if (task.deletedCount === 0)
      return res.status(400).json({ error: `Tarea con ID ${id} no existe` });
    res.status(200).json({ msg: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const task = await TaskModel.deleteMany({});
    if (task.deletedCount <= 0)
      return res.status(400).json({ error: `Error al eliminar las tareas` });
    res.status(200).json({ msg: "Tareas eliminadas correctamente" });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const getAllTasks = async (req, res) => {
  let tasks;
  try {
    if (isObjectEmpty(req.query)) tasks = await TaskModel.find({}).toArray();
    else {
      const { state } = req.query;
      if (state) {
        if (filters.includes(state))
          tasks = await TaskModel.find({ estado: state }).toArray();
        else
          return res.status(400).json({ error: "Valor de consulta inválido" });
      } else
        return res
          .status(400)
          .json({ error: "Parámetro de consulta inválido" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(new ObjectId(id));
    if (!task)
      return res.status(400).json({ error: `Tarea con ID ${id} no existe` });
    res.status(200).json({ task });
  } catch (error) {
    res.status(404).json({ error });
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
