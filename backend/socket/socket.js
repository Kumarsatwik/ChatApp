import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

app.use(cors("*"));

const server = http.createServer(app);
const clientUrl = process.env.CLIENT_URL;
const io = new Server(server, {
  cors: {
    origin: [clientUrl],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

export const getReceieverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; //{userId:socketId}

io.on("connection", (socket) => {
  //   console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }

  //io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  io.on("typing", ({ conversationId, userId }) => {
    console.log("typing", conversationId, userId);
    socket.to(conversationId).emit("userTyping", userId);
  });

  //   socket.on() is used to listend to the events . can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
