import mongoose, { mongo } from "mongoose";

const fuelOwner = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: {
    type: Number,
    required: true,
    unique: true,
  },
});

const fuelown = mongoose.model("fuelowner", fuelOwner);
export default fuelown;
