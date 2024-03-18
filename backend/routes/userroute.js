import express from "express";
import userRegister from "../controller/usercontroller.js";
import twilio from "twilio";
import dotenv from "dotenv";
import loginuser from "../controller/loginUsercontroller.js";
dotenv.config();

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", loginuser);

export default router;
