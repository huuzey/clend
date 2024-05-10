import express from "express";
import {
  allStation,
  fuelUpdate,
  fuelcontrol,
  ownerfuel,
  rateme,
  singlefuel,
  stationSearch,
} from "../controller/fuelownercontroller.js";
import { verifyToken } from "../controller/verifyToken.js";
import {
  addwerefa,
  deletewerefa,
  updatewerefa,
  werefa,
} from "../controller/werefacontroller.js";

const router = express.Router();

router.post("/fuelowner", ownerfuel);
router.post("/fuelowner/werefa", addwerefa);
router.put("/user/delete/:id", deletewerefa);
router.put("/fuelowner/updatewerefa/:id", updatewerefa);
router.get("/werefa/:id", werefa);
router.get(`/fuelcontrol/:id/:email`, fuelcontrol);
router.get(`/all`, allStation);
router.get(`/search`, stationSearch);
router.get(`/singlefuel/:id/:email`, singlefuel);
router.put(`/fuelupdate/:id/:user`, fuelUpdate);
router.put(`/rateme/:id`, rateme);

export default router;
