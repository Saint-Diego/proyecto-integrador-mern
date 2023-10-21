const { onRequest } = require("firebase-functions/v2/https");
const app = require("./src/app");
const connectDB = require("./src/db");
const { error } = require("firebase-functions/logger");

connectDB().on("error", () => console.log.bind(error));
connectDB().once("open", () => console.log("Database connected"));

exports.server = onRequest(app);
