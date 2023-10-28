const { validationResult } = require("express-validator");
const { Types } = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (username == user.username && password == user.password) {
      const payload = {
        isActive: true,
        username,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "10000",
      });
      return res.status(200).json({
        message: "Usuario logeado correctamente",
        user: { id: user._id, username: user.username },
        token,
      });
    }
    res.status(400).json({ error: "Usuario o contrasaña incorrecto" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const { username, password } = req.body;
    const userFinded = await UserModel.findOne({ username });
    if (userFinded)
      return res.status(400).json({
        error: `El nombre de usuario ${username}, ya se encuentra registrado`,
      });
    const newUser = new UserModel({
      username,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    throw new Error(error.message);
  }
};

const findTasksByUser = async (req, res) => {
  const { id } = req.query;
  try {
    const userTasks = await UserModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "_userId",
          as: "tasks",
        },
      },
    ]);
    res.status(200).json(userTasks[0]?.tasks);
  } catch (error) {
    throw new Error(error.message);
  }
};

// const validateToken = (req, res) => {
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     req.decoded = decoded;
//     res.status(200).json({ isValid: true });
//   } catch (error) {
//     res.status(401).json({ isValid: false });
//   }
// };

module.exports = {
  login,
  register,
  findTasksByUser,
  // validateToken,
};
