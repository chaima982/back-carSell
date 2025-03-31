const express = require('express');
const route = express.Router();
const upload = require('../middlewares/uploadFile');
const demandeController = require('../Controller/DemandeController');

route.post("/add",upload.array('gallery','previewImage'), demandeController.createDem)
/* route.post("/add", demandeController.createDem) */
route.get("/", demandeController.getAllDem)
route.put('/:id',demandeController.updateDem)
route.delete('/delete/:id', demandeController.delete)
route.get('/get/:id',demandeController.getIdDem)

module.exports = route