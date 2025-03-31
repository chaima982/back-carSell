const mongoose = require('mongoose')
const multer = require("multer");


const paiementScheme = new mongoose.Schema({
    montant:{
        type : Number,
        trim: true,
    
     
    },
    cardNumber:{
        type : Number,
        trim: true,
        required: true,  
    },
    expire:{
        type : Date,
        trim: true,
        required: true,  
     
    },
    expire:{
        type :String,
        trim: true,
        required: true,  
     
    },
    name:{
        type : String,
        trim: true,
        required: true, 
    },
      cardType:{
        type : String,
        trim: true,
        required: true, 
    },
    numeroTransaction: {
        type: String,
        trim: true,
  
    },
    EffectuePaiement: {
        type: Boolean,
        trim: true,
   
    },
    listAchat:[{
        type: String,
        trim: true,
      
    }],
    
users:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'seller'
}],
  
  
    sponsoring:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sponsorship'
    }
})
module.exports = mongoose.model('paiement',paiementScheme)