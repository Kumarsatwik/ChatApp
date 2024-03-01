import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, // prevent XSS attack from cross-site scripting attacks
    sameSite: "none", // prevent CSRF attacks
    secure: true,
  });
  console.log("generateToken", res.cookies); // undefined
};
export default generateToken;
