const express = require('express');
const route = express.Router();

const contactController = require('../Controller/contactController');

route.post("/add", contactController.create)
route.get("/", contactController.getAll)
route.put('/:id',contactController.update)
route.delete('/delete/:id', contactController.delete)
route.get('/get/:id',contactController.getId)

module.exports = route