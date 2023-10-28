const express = require("express");
const { check } = require("express-validator");
const routesUser = express.Router();
const {
  login,
  register,
  findTasksByUser,
} = require("../controllers/userController");

const validateBody = [
  check("username", "El nombre de usuario es requerido").not().isEmpty(),
  check("password", "La contraseña es requerida").not().isEmpty(),
];

routesUser.get("/", findTasksByUser);

routesUser.post("/login", validateBody, login);

routesUser.post("/register", validateBody, register);

module.exports = routesUser;
