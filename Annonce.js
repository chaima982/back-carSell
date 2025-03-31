const mongoose = require('mongoose')
const multer = require("multer");
const galleryScheme = new mongoose.Schema({
    name:{
        type: "String"
    }
});
const AnnonceSchema = new mongoose.Schema({
    titre:{ type:String,
        trim: true,
        required: true,
       },

       gouvernerat:{ type:String,
            trim: true,
            required: true,
           },

    datePublication:{
        type : String,
        trim: true,
      
    },
    gallery:[galleryScheme],

    description: {
        type: String,
        trim: true, 
    },
 
    puissance: {
        type: Number,
        trim: true,
       required: true, 
    },
    
    cylindree: {
        type: Number,
        trim: true,
       required: true, 
    },
    
    carburant: {
        type: String,
        trim: true,
       required: true, 
    },
    
    carrosserie: {
        type: String,
        trim: true,
       required: true, 
    },
 
verified: { type: Boolean, default: false },
   
marque: {
    type: String,
    trim: true,
   required: true, 
},
modele: {
    type: String,
    trim: true,
   required: true, 
},
annee: {
    type:Number,
    trim: true,
   required: true, 
},
acompte: {
    type:Number,
    trim: true,
   required: true, 
},
kilometrage: {
    type: Number,
    trim: true,
   required: true, 
},

etat:{
    type: String,
    trim: true,
  
}, 
boite:{
    type: String,
    trim: true,
    required: true, 
}, 
price: {
    type: String,
    trim: true,
   required: true, 
},
sponsorshipstate: {
    type: Boolean,
    trim: true,
   default:false 
},

category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
  
},


    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
      
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      
    },
  
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'buyer'
    },
   expertise:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expertise'
    },
    sponsorship:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sponsorship',
        default: null
    },
    





})
module.exports = mongoose.model('annonce',AnnonceSchema)