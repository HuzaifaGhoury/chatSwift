//pswd : hCG02ZFdiaSQxYhb
//username: sajidzoya72
// password : yOhATGZBx6Vix6F4

require("dotenv").config();

const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://sajidzoya72:yOhATGZBx6Vix6F4@cluster0.se4z1qy.mongodb.net/?retryWrites=true&w=majority"
);

connect
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("not connected");
  });

const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;
const user = require("./models/userModel");
const userRoute = require("./routes/userRoutes");
app.use("/", userRoute);
const userNamespace = io.of("/user-namespace");

userNamespace.on("connection", async (socket) => {
  console.log("user connected");
  var userId = socket.handshake.auth.token;
  await user.findByIdAndUpdate({ _id: userId }, { $set: { isOnline: "1" } });
socket.broadcast.emit('getOnlineUser',{userId})
  socket.on("disconnect", async () => {
    console.log("user disconnected");
    var userId = socket.handshake.auth.token;
    await user.findByIdAndUpdate({ _id: userId }, { $set: { isOnline: "0" } });
    socket.broadcast.emit('getOfflineUser',{userId})

  });
});

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
