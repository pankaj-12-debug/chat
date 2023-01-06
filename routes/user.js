const express = require("express");
const router = express.Router();

const userController = require("../Controller/user");
const authorizationMWare=require('../middleware/authentication')

router.post("/signUp", userController.addUser);
router.post('/login',userController.login);
router.post('/sendMessage',authorizationMWare.authorization,userController.sendMessage)
router.get('/getAllMessage',userController.getAllMessage);
router.get("/getAllUser",userController.getAllUser);

module.exports = router;
