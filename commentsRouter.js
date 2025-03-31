const express = require('express');
const route = express.Router();

const commentsController = require('../Controller/commentsController');

route.post("/add", commentsController.create)
route.get("/:id", commentsController.getAll)
route.put('/:id',commentsController.update)
route.delete('/delete/:id', commentsController.delete)
route.get('/get/:id',commentsController.getbyId)

module.exports = route