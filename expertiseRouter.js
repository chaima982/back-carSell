const express = require('express');
const route = express.Router();

const expertiseControl = require('../Controller/expertiseController')

route.post('/add', expertiseControl.create);
route.get('/', expertiseControl.getAll);
route.delete('/notif/:id',expertiseControl.delete);
route.put('/:id', expertiseControl.update);
route.get('/get/:id' , expertiseControl.getIdrapport);

module.exports = route;