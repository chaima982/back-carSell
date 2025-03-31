const express = require('express');
const route = express.Router();
const upload = require('../middlewares/uploadFile');
const expertController = require('../Controller/expertscontroller');

route.post("/add",upload.array('gallery','previewImage'), expertController.create)
/* route.post("/add", demandeController.createDem) */
route.get("/", expertController.getAll)
route.put('/:id',expertController.update)
route.delete('/delete/:id', expertController.delete)
route.get('/get/:id',expertController.getId)

module.exports = route