const mongoose = require('mongoose')
const userMod = require("./userModel");
/* const galleryScheme = new mongoose.Schema({
    name:{
        type: "String"
    }
}); */

const ExpertScheme = new mongoose.Schema({

 /*    competences : {
        type : String,
        trim : true,
        required : true
    }, */
 /*    experience : {
        type : String,
        trim : true,
        required : true
    }, */
  
 /*    gallery:[galleryScheme], */

 /*    disponibile : {
        type : Boolean,
        trim : true,
        required : true
    }, */
   /*  Approved : {
        type : Boolean,
        trim : true,
        required : true
    },
  */
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
    demande:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'demande'
    },
    
    contrat:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contrat'
    }] ,
    messagerie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'messagerie'
    },
    car:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car'
    }]
})

userMod.discriminator("expert",ExpertScheme); 
module.exports = mongoose.model("expert")
