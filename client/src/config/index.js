import dotenv from "dotenv";
dotenv.config();
const { URL_API } = import.meta.env;

export const url_api = URL_API || "http://localhost:3000";
