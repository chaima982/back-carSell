const express = require('express');
const route = express.Router();

const sellerController = require('../Controller/SellerController')

route.post("/add", sellerController.create)
route.get("/", sellerController.getAll)
route.put('/:id',sellerController.update)
route.delete('/delete/:id', sellerController.delete)
route.get('/get/:id', sellerController.getId)

module.exports = route 