const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const setHeader = require("./utils/middlewares/setHeader");
const routesTask = require("./routes/routesTask");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));
app.use(setHeader);

app.get("/", (req, res) => {
  res.send(`<h3>Express Server</h3>
  <p>Welcome, to the server with express</p>`);
});

app.use("/tareas", routesTask);

module.exports = app;
