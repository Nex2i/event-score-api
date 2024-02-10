import dotenv from "dotenv";
dotenv.config();

export const { NODE_ENV, PORT, API_VERSION, ORIGIN, CREDENTIALS, SECRET_KEY } =
  process.env;
