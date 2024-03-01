import { registerSchema, loginSchema } from "../utils/validationSchema.js";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signupUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    console.log(fullName, userName, password, confirmPassword, gender);

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Avatar
    const maleProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const profilePicture =
      gender.toLowerCase() === "male" ? maleProfile : femaleProfile;

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePicture,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      return res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.userName,
        profilePic: newUser.profilePicture,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (e) {
    console.log("signup error", e);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    console.log("logout error", e);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Respond with user data
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.userName,
      profilePic: user.profilePicture,
      token: token,
    });
  } catch (e) {
    console.log("login error", e);
    return res.status(400).json({ error: "Something went wrong" });
  }
};
