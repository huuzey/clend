import User from "../models/user.js";
import Fuelowner from "../models/fuelowner.js";
import bcryptjs from "bcryptjs";

const userRegister = async (req, res) => {
  const { username, email, password, phone, address } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  console.log("delivered");

  const usernameExisted = await User.findOne({
    username,
  });
  try {
    if (usernameExisted) {
      res.status(403).json("user existed");
      return;
    }
    const emailExisted = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (emailExisted) {
      res.status(402).json("user existed");
      return;
    }
    const fuelown = await Fuelowner.findOne({
      $or: [{ email }, { phone }],
    });
    if (fuelown) {
      const newUser = new User({
        username,
        email,
        password: hashedpassword,
        phone,
        address,
        fuel: true,
      });
      await newUser.save();
      res.status(200).json("Successfully registered");
      return;
    }
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
      phone,
      address,
    });
    await newUser.save();
    res.status(200).json("Successfully registered");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default userRegister;
