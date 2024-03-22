import Fuelowner from "../models/fuelowner.js";

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
  const { id } = req.params;
  try {
    const exists = await Fuelowner.findById(id);
    if (!exists) {
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
  const { id } = req.params;

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
    res.status(200).json(stations);
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong!");
  }
  console.log("all stations");
};
export { ownerfuel, fuelcontrol, fuelUpdate, allStation };
