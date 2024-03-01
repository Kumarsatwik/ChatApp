import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers controller : ", error.message);
    return res.status(400).json({ error: "Internal server error" });
  }
};
