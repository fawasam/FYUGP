import express from "express";
import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import path from "path";
import CustomError from "./utils/CustomeError.js";
import { errorController } from "./controllers/errorController.js";

import UserRoute from "./routes/userRoute.js";
import AuthRoute from "./routes/authRoute.js";
import CollegeRoute from "./routes/collegeRoute.js";
import UploadRoute from "./routes/uploadRoute.js";

//app
const app = express();
const apiKey = process.env.API_KEY;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

//middeleware
app.use(express.json());
app.use(cors());
const __dirname = path.resolve();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//api key middleware
// app.use((req, res, next) => {
//   const apiKeyHeader = req.headers["api-key"];
//   if (apiKeyHeader === apiKey) {
//     next();
//   } else {
//     res.status(401).json("Unauthorized");
//   }
// });

app.get("/", (req, res) => {
  res.json("Hello, This is FYUGP Management system backend!!");
});

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString().slice(0, 10);
  next();
});

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1", UserRoute);
app.use("/api/v1/college", CollegeRoute);
app.use("/api/v1/upload", UploadRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Cannot find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

app.use(errorController);

export default app;
