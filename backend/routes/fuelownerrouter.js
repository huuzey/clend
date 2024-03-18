import express from "express";
import fuelowner from "../controller/fuelownercontroller.js";

const router = express.Router();

router.post("/fuelowner", fuelowner);

export default router;
