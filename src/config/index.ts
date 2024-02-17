import dotenv from "dotenv";
dotenv.config();

export const {
  PORT,
  API_VERSION,
  ORIGIN,
  CREDENTIALS,
  SECRET_KEY,
  FRONTEND_ORIGIN,
} = process.env;
