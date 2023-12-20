//pswd : hCG02ZFdiaSQxYhb
//username: sajidzoya72
// password :ivDs9BgVjKTjwKTk

require("dotenv").config();
const fs = require("fs");

const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://sajidzoya72:ivDs9BgVjKTjwKTk@cluster0.hnnttn0.mongodb.net/?retryWrites=true&w=majority"
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

const userRoute = require("./routes/userRoutes");
app.use("/", userRoute);

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
