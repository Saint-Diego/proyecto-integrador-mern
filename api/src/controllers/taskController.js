const { validationResult } = require("express-validator");
const { Types } = require("mongoose");
const TaskModel = require("../models/task");

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const { title, description, _userId } = req.body;
    const taskFinded = await TaskModel.findOne({ title });
    if (taskFinded)
      return res.status(400).json({
        error: `Tarea con nombre ${title}, ya se encuentra registrada`,
      });
    const newTask = new TaskModel({
      title,
      description,
      _userId: new Types.ObjectId(_userId),
    });
    const taskCreated = await newTask.save();
    res
      .status(201)
      .json({ message: "Tarea guardada correctamente", task: taskCreated });
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const taskUpdated = await TaskModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Tarea actualizada correctamente", task: taskUpdated });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.deleteMany({});
    if (tasks.deletedCount <= 0)
      throw new Error("Error al eliminar las tareas");
    res.status(200).json({ message: "Tareas eliminadas correctamente" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getFilterTasks = async (req, res) => {
  const { isCompleted } = req.query;
  try {
    const tasks = await TaskModel.find({ isCompleted });
    return res.status(200).json(tasks);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const taskFinded = await TaskModel.findById(id);
    if (!taskFinded)
      return res.status(404).json({ error: `Tarea con ID ${id} no existe` });
    res.status(200).json(taskFinded);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  getAllTasks,
  getFilterTasks,
  getTaskById,
};
