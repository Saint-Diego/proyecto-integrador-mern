const { onRequest } = require("firebase-functions/v2/https");
const app = require("./src/app");
const connectDB = require("./src/db");
const { port } = require("./src/config/index");

app.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});

exports.server = onRequest(app);
