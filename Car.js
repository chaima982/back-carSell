const mongoose = require('mongoose')
const multer = require("multer");

const CarScheme = new mongoose.Schema({
    ref:{
        type : String,
        trim: true,
        required: true,
        unique: true,
    },
    model: {
        type: String,
        trim: true,
        required: true,
    },
    marque: {
        type: String,
        trim: true,
        required: true,
    },

    price:{
        type: Number,
        trim: true,
        required: true,
    },
    
    etat:{
        type: String,
        trim: true,
        required: true,
    },
    anneeFabrication: {
        type: Date,
        trim: true,
        required: true
    },
    kilometrage:{
        type: String,
        trim: true,
        required: true,
    },
    carburant:{
        type: String,
        trim: true,
        required: true,
    },
    transmission:{
        type: String,
        trim: true,
        required: true,
    },
    
    annonce:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'annonce'
    },
    
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    expert:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expert'
    }]

})
module.exports = mongoose.model("car",CarScheme)