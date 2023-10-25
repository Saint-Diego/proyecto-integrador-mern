const TaskModel = require("../../models/task");
const isObjectEmpty = require("../isObjectEmpty");

const filters = ["true", "false"];

const validateQueryParams = async (req, res, next) => {
  try {
    if (!isObjectEmpty(req.query)) {
      const { isCompleted } = req.query;
      if (isCompleted) {
        if (filters.includes(isCompleted)) {
          const completed = isCompleted == "true";
          console.log("isCompleted", completed);
          const tasks = await TaskModel.find({ isCompleted: completed });
          return res.status(200).json(tasks);
        } else throw new Error("Valor de consulta inválido");
      } else throw new Error("Parámetro de consulta inválido");
    } else next();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = validateQueryParams;
