require("dotenv").config();
const mongoose = require("mongoose");
const { mongo_uri } = require("./config/index");

const connectDB = () => {
  mongoose
    .connect(mongo_uri)
    .then(() => console.log("Connecting database..."))
    .catch((error) => console.log(error));
  return mongoose.connection;
};

module.exports = connectDB;
