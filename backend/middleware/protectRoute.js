import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Not authorized" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User Not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized" });
  }
};

export default protectRoute;
