import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();
const { Client } = pkg;

export const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT,
});
await client.connect();
console.log("Terhubung ke basis data.");
