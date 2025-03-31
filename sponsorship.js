const mongoose = require('mongoose')
const multer = require("multer");


const sponsorshipSchema = new mongoose.Schema({
   
    montantPaye: {
        type: String,
        trim: true,
     
    },
    nomSponsor: {
        type: String,
        trim: true
    },
    visibiliteAnnonce:[{
        type: Boolean,
        trim: true
    }],
    

    annonce:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'annonce'
    }],
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
})
module.exports = mongoose.model('sponsorship',sponsorshipSchema)