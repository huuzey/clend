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
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  queue: {
    type: Number,
    default: 0,
  },
  benzene: {
    type: Boolean,
    required: true,
  },
  naphta: {
    type: Boolean,
    required: true,
  },
  kerosene: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const fuelown = mongoose.model("fuelowner", fuelOwner);
export default fuelown;
