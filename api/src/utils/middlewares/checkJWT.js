require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkJWT = (req, res, next) => {
  const token = req.headers.authorization;
  const dataToken = token.split(" ")[1];
  try {
    jwt.verify(dataToken, process.env.SECRET);
    next();
  } catch (error) {
    throw new Error("Token inválido");
  }
};

module.exports = checkJWT;