import express from "express";
import {
  allStation,
  fuelUpdate,
  fuelcontrol,
  ownerfuel,
  stationSearch,
} from "../controller/fuelownercontroller.js";

const router = express.Router();

router.post("/fuelowner", ownerfuel);
router.get(`/fuelcontrol/:id`, fuelcontrol);
router.get(`/all`, allStation);
router.get(`/search`, stationSearch);
router.put(`/fuelupdate/:id`, fuelUpdate);

export default router;
