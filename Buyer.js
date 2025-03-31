const userMod = require("./userModel")
const mongoose = require ('mongoose')

const buyerScheme = new mongoose.Schema({
    addresseBuyer:{
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
}],
contrat:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contrat'
}]
});


userMod.discriminator('buyer',buyerScheme)
module.exports= mongoose.model("buyer")