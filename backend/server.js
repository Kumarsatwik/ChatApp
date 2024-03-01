import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// import path from "path";
dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToDB from "./config/mongo.db.js";
import { app, server } from "./socket/socket.js";

connectToDB();

const PORT = process.env.PORT || 4000;

app.use(express.json()); // for parsing application/json
app.use(cookieParser());

app.use(cors("*"));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
