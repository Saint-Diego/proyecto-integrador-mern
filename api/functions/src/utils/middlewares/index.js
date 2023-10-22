import { getFilterTasks } from "../../controllers/taskController";

// const TaskModel = require("../../models/task");
const isObjectEmpty = require("../isObjectEmpty");

const filters = [true, false];

export const setHeader = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
};

export const validateQueryParams = async (req, res, next) => {
  if (!isObjectEmpty(req.query)) {
    const { isCompleted } = req.query;
    if (typeof isCompleted != "undefined") {
      if (filters.includes(isCompleted)) getFilterTasks(req, res);
      else throw new Error("Valor de consulta inválido");
    } else throw new Error("Parámetro de consulta inválido");
  } else next();
};

export const emptyBody = (req, res, next) => {
  if (!isObjectEmpty(req.body)) next();
  else res.status(400).json({ error: "Envíe como mínimo un campo" });
};
