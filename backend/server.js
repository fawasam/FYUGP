import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./config/config.env",
});
import app from "./app.js";

//connect db
connectDB();

//app
const PORT = process.env.PORT || 3000;

//port
const server = app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`.white);
});
process.on("unhandledRejection", (err) => {
  console.log(err.name, "+" + err.message);
  console.log("Unhandled rejection occurred! Shutting down server ...");
  server.close(() => {
    process.exit(1);
  });
});
