const mongoose = require('mongoose')

const expertiseSchema = new mongoose.Schema({
 dateexpertise:{ 
        type:Date,
        trim: true,},

name:{  type:String,
    trim: true,
    required: true,},

   
titre:{  type:String,
    trim: true,
    required: true,}, 
    carrosserie:{ 
        type:String,
        trim: true,
        required: true,
       },

       paneaux:{
         type:String,
            trim: true,
            required: true,
           },

        cadre:{
        type : String,
        trim: true,
        required:true,
      
    },


    moteur: {
        type: String,
        trim: true, 
        required:true,
    },
    frein: {
        type: String,
        trim: true, 
        required:true,
    },
    freinmain: {
        type: String,
        trim: true, 
        required:true,
    },
    suspension: {
        type: String,
        trim: true,
       required: true, 
    },
    
    direction: {
        type:String,
        trim: true,
       required: true, 
    },
    
    battrie: {
        type: String,
        trim: true,
       required: true, 
    },
    
    feu: {
        type: String,
        trim: true,
       required: true, 
    },
    electro: {
    type: String,
    trim: true,
   required: true, 
},
commentaire: {
    type: String,
    trim: true,
   required: true, 
},

    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller'
      
    },
    annonce:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'annonce'
      
    },

  expert:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expert'
      
    },
    
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  
},





})
module.exports = mongoose.model('expertise',expertiseSchema)