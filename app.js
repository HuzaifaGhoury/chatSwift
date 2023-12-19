//pswd : hCG02ZFdiaSQxYhb
//username: sajidzoya72


require('dotenv').config();


const mongoose = require ("mongoose")

const connect = mongoose.connect('mongodb+srv://sajidzoya72:hCG02ZFdiaSQxYhb@cluster0.2ogsjoi.mongodb.net/?retryWrites=true&w=majority')


connect.then(()=>{
    console.log("database connected")
}).catch(()=>{
    console.log("not connected")
})


const express = require('express');
const app = express();
const http = require('http').Server(app);

const userRoute = require('./routes/userRoutes')
app.use('/',userRoute)
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
