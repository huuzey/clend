import express from "express";
import report from "../controller/reportcontroller.js";

const router = express.Router();

router.post("/report", report);

export default router;
