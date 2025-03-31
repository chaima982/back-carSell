const mongoose = require('mongoose');
const multer = require("multer");
const galleryScheme = new mongoose.Schema({
    name:{
        type: "String"
    }
});
const adminSchema = new mongoose.Schema({
    lastname: {
        type: String,
       /*  required: true, */
        trim: true
    },
    name: {
        type: String,
        /*  required: true,  */
        trim: true
    },
    CIN: {
        type: String,
        unique: true,
        /* required: true, */
        trim: true
    },
    phone:{
        type:String,
      /*   required:true, */
        trim:true
       },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
       
       
       
    gallery:[galleryScheme],

    Approvexpert : {
        type : Boolean,
        trim : true,
       },
    demande:[{    
            type: mongoose.Schema.Types.ObjectId,
            ref: 'demande'
    }],
    sponsorship:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sponsorship'
    }]

})


module.exports = mongoose.model('admin',adminSchema)