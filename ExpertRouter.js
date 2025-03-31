const express = require('express');
const route = express.Router();

const expertController = require('../Controller/ExpertController');

route.post("/add", expertController.create);
route.get("/", expertController.getAll);
route.delete('/expert/:id', expertController.delete);
route.put('/:id', expertController.update);
route.get("/expert/:id" , expertController.getId);

module.exports = route;