const express = require('express');
const route = express.Router();

const sponsorController = require('../Controller/SponsorshipController');

route.post("/add", sponsorController.createSponsor);
route.get("/", sponsorController.getAllSponsor);
route.delete('/sponsor/:id', sponsorController.deleteSponsor);
route.put('/:id', sponsorController.updateSponsor);
route.get("/sponsor/:id" , sponsorController.getIdSponsor);

module.exports = route;