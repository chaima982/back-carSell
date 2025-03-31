const express = require('express');
const route = express.Router();

const upload = require('../middlewares/uploadFile');
const adminCont = require('../Controller/adminController');
route.post("/add",upload.array('gallery'), adminCont.create)
route.post("/register", adminCont.register)
route.delete("/logout", adminCont.logout)
route.put("/:id", upload.array('gallery'), adminCont.update)
route.get("/", adminCont.getAll)
route.delete('/delete/:id', adminCont.delete)
route.get('/get/:id', adminCont.getById)
route.post("/login", adminCont.login); 
//exportation
module.exports = route;