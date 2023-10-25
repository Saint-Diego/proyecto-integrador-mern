const TaskModel = require("../../models/task");

const existsTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(id);
    task ? next() : res.status(400).json({ message: `Tarea con ID ${id} no existe` });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = existsTask;