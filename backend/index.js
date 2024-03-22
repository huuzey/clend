import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { clearLine } from "readline";
dotenv.config();
import userrouter from "./routes/userroute.js";
import fuelowner from "./routes/fuelownerrouter.js";

const app = express();
app.listen(4000, () => {
  console.log("listening");
});
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
    window.location.reload();
  });

app.use("/user", userrouter);
app.use("/user", fuelowner);
app.use("/station", fuelowner);
