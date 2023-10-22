require("dotenv").config();
const { LOCAL_HOST, LOCAL_PORT, MONGO_URI } = process.env;

module.exports = {
  host: LOCAL_HOST || "localhost",
  port: LOCAL_PORT || 3000,
  mongo_uri:
    MONGO_URI ||
    "mongodb+srv://saint-diego:diego89@cluster0.yvshasw.mongodb.net/db_tasks_list?retryWrites=true&w=majority",
};
