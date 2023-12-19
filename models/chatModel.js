const mongoose = require('mongoose')
const chatSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
ref:"User"    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" 
    },
    message:{
        type:String,
        require:true
    },
  
},{timesstamps:true})
module.exports = mongoose.model('Chat',chatSchema)