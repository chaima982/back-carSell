
const mongoose = require("mongoose")


const database = "mongodb://0.0.0.0:27017/car_sell";


const db = mongoose.connect(database, (err)=> {
   
    if(!err){
        console.log("connected to the DB");
    } else {
        console.log(err);
    }
  
});

module.exports = db;