import express from "express";
import {
  allStation,
  fuelUpdate,
  fuelcontrol,
  ownerfuel,
  singlefuel,
  stationSearch,
} from "../controller/fuelownercontroller.js";
import { verifyToken } from "../controller/verifyToken.js";

const router = express.Router();

router.post("/fuelowner", ownerfuel);
router.get(`/fuelcontrol/:id/:email`, fuelcontrol);
router.get(`/all`, allStation);
router.get(`/search`, stationSearch);
router.get(`/singlefuel/:id`, singlefuel);
router.put(`/fuelupdate/:id/:user`, fuelUpdate);

export default router;
