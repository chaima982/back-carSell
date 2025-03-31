 
const mongoose = require('mongoose')
const CategoryScheme = new mongoose.Schema({
     id:{ type:mongoose.Schema.Types.ObjectId,}, 

    /*  index:{type:Number}, */
    
    name: {
        type: String,
        trim: true,
        required: true,
    }, 
    description:{
        type: String,
        trim: true,
        required: true, 
    },
    annonce:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"car"
        }
    ]
})


module.exports = mongoose.model("category",CategoryScheme )