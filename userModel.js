const mongoose = require('mongoose')


const baseOption = {
    discriminatorKey: "itemtype", 
    collections: 'users' 
}
const galleryScheme = new mongoose.Schema({
    name:{
        type: "String"
    }
});
const userScheme = new mongoose.Schema({
   itemtype: {
        type: String,
       
        enum: [ 'seller', 'buyer','expert'], 
    }, 
    gallery:[galleryScheme],
    lastname: {
        type: String,
       /*  required: true, */
        trim: true
    },
    name: {
        type: String,
        /*  required: true,  */
        trim: true
    },
    isSponsored: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    CIN: {
        type: String,
        unique: true,
        /* required: true, */
        trim: true
    },
    phone:{
        type:String,
      /*   required:true, */
        trim:true
       },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        newPassword: {
            type: String,
            unique: true,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
       
        blocked: {
            type: Boolean,
            default: false
        },
        verified: {
            type: Boolean,
            default: false

        },
        codeVerification: {
            type: String,
        },
        avatar:{String},
        status:{String},
        lastSeen:{String},

    },
    baseOption
); 

userScheme.statics.updateUser = function (userId, updateData) {
    return this.findOneAndUpdate({ _id: userId }, updateData, { new: true });
};

module.exports = mongoose.model("user", userScheme)