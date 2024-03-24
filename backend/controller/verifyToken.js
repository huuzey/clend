import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(400).json("Something went wrong!");
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      res.status(400).json("Something went wrong!");
      return;
    }
    req.user = user;
    next();
  });
};
