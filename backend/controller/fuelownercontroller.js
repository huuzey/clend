import Fuelowner from "../models/fuelowner.js";
import jwt from "jsonwebtoken";

const ownerfuel = async (req, res) => {
  const { email, phone, name, location, benzene, kerosene, naphta } = req.body;
  try {
    if (email && phone) {
      const fuelownerexist = await Fuelowner.findOne({
        $or: [{ email }, { phone }],
      });
      if (fuelownerexist) {
        res.status(400).send("Fuelowner Existed");
        return;
      }
      const newfuelowner = new Fuelowner(req.body);
      await newfuelowner.save();
      res.status(200).json("Fuelowner saved successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const fuelcontrol = async (req, res) => {
  const { id, email } = req.params;
  try {
    const exists = await Fuelowner.findById(id);
    if (!exists) {
      res.status(400).json("Doen't exist");
      return;
    }
    if (email !== exists.email) {
      res.status(400).json("Doen't exist");
      return;
    }

    res.status(200).json(exists._doc);
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
const fuelUpdate = async (req, res) => {
  const { id, user } = req.params;

  try {
    const fuel = await Fuelowner.findByIdAndUpdate(id, req.body);
    const exists = await Fuelowner.findById(id);
    res.status(200).json(exists._doc);
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};

const allStation = async (req, res) => {
  try {
    const stations = await Fuelowner.find();
    const rest = stations.map((station) => {
      const { email: em, phone: ph, ...filetered } = station._doc;
      return filetered;
    });
    res.status(200).json({ rest });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
const stationSearch = async (req, res) => {
  const { location, kerosene, benzene, naphta } = req.query;
  try {
    const requested = await Fuelowner.find({
      ...(location && { location: { $regex: location, $options: "i" } }),
      ...(kerosene && { kerosene: true }),
      ...(benzene && { benzene: true }),
      ...(naphta && { naphta: true }),
    });
    const rest = requested.map((station) => {
      const { email: em, phone: ph, ...filetered } = station._doc;
      return filetered;
    });
    res.status(200).json({ rest });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
const singlefuel = async (req, res) => {
  const { id, email } = req.params;
  var ems = "";
  try {
    const exists = await Fuelowner.findById(id);
    if (!exists) {
      res.status(400).json("Something went wrong!");
      return;
    }

    const { email: em, phone: ph, ...rest } = exists._doc;
    if (em === email) {
      ems = true;
    }
    res.status(200).json({ rest, ems });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
const rateme = async (req, res) => {
  const { id } = req.params;
  const { userId, values } = req.body;
  try {
    const found = await Fuelowner.findById(id);
    const done = await found.updateOne({
      email: found.email,
      phone: found.phone,
      name: found.name,
      image: found.image,
      location: found.location,
      queue: found.queue,
      benzene: found.benzene,
      naphta: found.naphta,
      kerosene: found.kerosene,
      rating: [...found.rating, { user: userId, value: values }],
    });

    res.status(200).json("Successfully rated!");
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
};
export {
  ownerfuel,
  singlefuel,
  fuelcontrol,
  stationSearch,
  fuelUpdate,
  allStation,
  rateme,
};
