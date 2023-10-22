require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routesTask = require("./routes/routesTask");
const { setHeader } = require("./utils/middlewares/index");

const methods = ["GET", "POST", "PUT", "DELETE"];

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/tareas", routesTask);

app.use(setHeader);

app.use((req, res, next) => {
  if (methods.includes(req.method)) next();
  else res.status(400).json({ error: "Método http no válido" });
});

module.exports = app;
