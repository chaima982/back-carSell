const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    /* sender: { type: String, required: true },
    receiver: { type: String, required: true }, */
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
  });
  


module.exports = mongoose.model('Message', messageSchema);
 