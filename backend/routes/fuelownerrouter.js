import express from "express";
import {
  allStation,
  fuelUpdate,
  fuelcontrol,
  ownerfuel,
} from "../controller/fuelownercontroller.js";

const router = express.Router();

router.post("/fuelowner", ownerfuel);
router.get(`/fuelcontrol/:id`, fuelcontrol);
router.get(`/all`, allStation);
router.put(`/fuelupdate/:id`, fuelUpdate);

export default router;
