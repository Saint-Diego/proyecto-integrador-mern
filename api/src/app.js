require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routesTask = require("./routes/routesTask");

const methods = ["GET", "POST", "PUT", "DELETE"];

require("./db");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/tareas", routesTask);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use((req, res, next) => {
  if (methods.includes(req.method)) next();
  else res.status(400).json({ error: "Método http no válido" });
});

module.exports = app;
