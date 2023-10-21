const { onRequest } = require("firebase-functions/v2/https");
const app = require("./src/app");
const connectDB = require("./src/db");

app.once("open", async () => {
  await connectDB();
})

exports.server = onRequest(app);
