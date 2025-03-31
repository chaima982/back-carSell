const mongoose = require('mongoose')
const multer = require("multer");


const notificationSchema = new mongoose.Schema({
   
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
      },
      
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    });
module.exports = mongoose.model('notification',notificationSchema)