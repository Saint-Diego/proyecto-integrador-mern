const mongoose = require("mongoose");
const { mongo_uri } = require("./config/index");

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("Database connected");
    return mongoose.connection;
  } catch (error) {
    console.error(`Error when connecting the database: ${error}`);
  }
};

module.exports = connectDB;
