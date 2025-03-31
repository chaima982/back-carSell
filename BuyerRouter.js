const express = require('express');
const route = express.Router();
const buyerController = require('../Controller/BuyerController');

/* const upload = require('../middlewares/uploadFile');
route.put('/:id', upload.single('pic'), customerController.update)
route.post("/add", upload.single('pic'), customerController.create) */

route.post("/add", buyerController.create)
route.get("/", buyerController.gatAll)
route.put('/:id', buyerController.update)
route.delete('/delete/:id', buyerController.delete)
route.get('/get/:id',buyerController.getId)

module.exports = route