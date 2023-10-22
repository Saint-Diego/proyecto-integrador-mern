const express = require("express");
const { check } = require("express-validator");
const routesTask = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  getAllTasks,
  getTaskById,
} = require("../controllers/taskController");
const {
  emptyBody,
  validateQueryParams,
} = require("../utils/middlewares/index");

routesTask
  .route("/")
  .get(validateQueryParams, getAllTasks)
  .post(
    [
      check("title", "El nombre es obligatorio").not().isEmpty(),
      check("description", "La descripción es obligatoria").not().isEmpty(),
    ],
    createTask
  )
  .delete(deleteAllTasks);

routesTask
  .route("/:id")
  .get(getTaskById)
  .put(emptyBody, updateTask)
  .delete(deleteTask);

module.exports = routesTask;
