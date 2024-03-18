import Fuelowner from "../models/fuelowner.js";

const ownerfuel = async (req, res) => {
  const { email, phone } = req.body;
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
      res.status(200).send("Fuelowner saved successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
export default ownerfuel;
