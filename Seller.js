const userMod = require("./userModel");
const mongoose = require('mongoose');
const multer = require("multer");

const sellerScheme = new mongoose.Schema({

    addresseSeller:{
        type : String,
        trim : true,
        required : true
    },
 paiement:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'paiement'

 },
 messagerie:{
    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messagerie'
   
 },
 annonce:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'annonce'
}]
})

userMod.discriminator("seller",sellerScheme); 
module.exports = mongoose.model("seller")