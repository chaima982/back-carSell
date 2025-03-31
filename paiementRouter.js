const express = require('express');
const route = express.Router();

const paiementControl = require('../Controller/PaiementController');

route.post('/add', paiementControl.create);
route.get('/', paiementControl.getAll);
route.delete('/paiement/:id', paiementControl.delete);
route.put('/:id', paiementControl.update);
route.get('/get/:id' , paiementControl.getId);

module.exports = route;