const express = require('express');
const route = express.Router();

const carController = require('../Controller/carController');

route.post("/add", carController.createCar)
route.get("/", carController.getAllCar)
route.put('/:id',carController.updateCar)
route.delete('/delete/:id', carController.deleteCar)
route.get('/get/:id',carController.getIdCar)

module.exports = route