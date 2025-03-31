 
const mongoose = require('mongoose')
const CommentsScheme = new mongoose.Schema({
    
    text: {
        type: String,
        trim: true,
        required: true,
    }, 

  
    annonce:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"annonce"
        },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})


module.exports = mongoose.model("comments",CommentsScheme )