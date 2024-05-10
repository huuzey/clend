import mongoose from "mongoose";

const werefaschema = new mongoose.Schema({
  station: { type: String },

  werefa: [
    {
      user: { type: String },
      plate: { type: String, required: false },
      paid: { type: Boolean },
      time: { type: Date },
      amount: { type: Number },
    },
  ],
});
const werefamod = mongoose.model("werefa", werefaschema);
export default werefamod;
