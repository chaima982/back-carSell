const express = require('express');
const route = express.Router();

const usercontroller = require('../Controller/userController');
const upload = require('../middlewares/uploadFile');
 route.post("/login", usercontroller.login); 
 route.get('/countUsers', usercontroller.countAllUsers);


route.delete('/logout', usercontroller.logout);
route.post('/refresh', usercontroller.refresh);
route.post("/register",usercontroller.register);
route.get("/verify/:codeVerification" , usercontroller.verifyMail);
route.post("/add",upload.array('gallery'), usercontroller.create)
route.put('/:id', usercontroller.updateUser);
route.delete('/:id', usercontroller.deleteUser);
route.get('/', usercontroller.getAllUsers);
route.get('/expert', usercontroller.getExpert);
route.get('/admin', usercontroller.getAdmin);
route.get('/acheteur', usercontroller.getAcheteur);
route.get('/vendeur', usercontroller.getVendeur); 
route.get('/get/:id', usercontroller.getById);
route.get('/profil/:id', usercontroller.getProfil);

module.exports = route;