const express = require("express");
const router = express.Router();

const groupController=require('../Controller/group');

const authorizationMWare = require("../middleware/authentication");

router.post('/addGroup',authorizationMWare.authorization,groupController.addGroup);
router.get("/getAllGroup",authorizationMWare.authorization,groupController.getAllGroup);
router.post("/addUserGroup", groupController.addUserGroup);
router.get("/adminChecks",authorizationMWare.authorization,groupController.adminChecks);
router.post("/addAdminGroup",groupController.addAdminGroup);
router.get("/groupUser",groupController.groupUser);
router.post("/deleteUserGroup", groupController.deleteUserGroup);

module.exports=router;