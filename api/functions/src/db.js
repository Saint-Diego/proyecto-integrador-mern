require("dotenv").config();
const mongoose = require("mongoose");
const { mongo_uri } = require("./config/index");

const connectDB = () => {
  mongoose
    .connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected"))
    .catch((error) =>
      console.error(`Error when connecting the database: ${error}`)
    );
  return mongoose.connection;
};

module.exports = connectDB;
