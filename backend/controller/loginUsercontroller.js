import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existed = await User.findOne({ email });
    if (!existed) {
      res.status(401).json("User not found");
      return;
    }
    if (existed) {
      const validPassword = bcryptjs.compareSync(password, existed.password);
      if (!validPassword) {
        res.status(400).json("email or password");
        return;
      }
      const { password: pass, ...rest } = existed._doc;
      const token = jwt.sign(
        {
          userId: existed._id,
          fuelowner: existed.fuel,
          owner: existed.owner,
          admin: existed.isAdmin,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "365d",
        }
      );
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
      return;
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export default loginuser;
