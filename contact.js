const mongoose = require('mongoose')
const multer = require("multer");


const contactScheme = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
   lastname:{
        type : String,
        trim: true,
        required: true,
      
    },
   phone:{
        type : Number,
        trim: true,
        required: true,
      
    },
    email:{
        type : String,
        trim: true,
        unique:true,
        required: true,
      
    },
    message:{
        type : String,
        trim: true,
        required: true,
      
    },
    formattedTime:{
        type : Date,
       
      
    },
    

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    },
    expert:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expert'
    }]

})
module.exports = mongoose.model('contact',contactScheme)