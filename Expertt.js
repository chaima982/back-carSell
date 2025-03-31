const mongoose = require('mongoose')
const multer = require("multer");

const galleryScheme = new mongoose.Schema({
    name:{
        type: "String"
    }
}); 
const imageScheme = new mongoose.Schema({
    name:{
        type: "String"
    }
});
const experttSchema = new mongoose.Schema({

    lastname: {
        type: String,
         required: true, 
        trim: true
    },
    name: {
        type: String,
        required: true,  
        trim: true
    },
    CIN: {
        type: Number,
        required: true,
        trim: true
    },
    phone:{
        type:Number,
        required:true,
        trim:true
       },
        email: {
            type: String,
            required: true,
            trim: true
        },
    
       
        localisation : {
            type : String,
            trim : true,
            required : true
        },
        
   gallery:[galleryScheme], 
  nbrexperience : {
    type : String,
    trim : true,
    required : true
}, 
tarifprofesional : {
    type : String,
    trim : true,
    required : true
},
previewImage:[imageScheme], 
    expert:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expert'
    },
   admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    } ,
    user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'}
})

module.exports = mongoose.model('experts',experttSchema)