const express = require("express");
const addCategory = require('../modules/admin/addCategoryControllers.js');
const checkUserAuth=require('../modules/authentication/authaTokenCheck.js')
 
const router = express.Router();
//Public routes
router.post('/addCategory',checkUserAuth,addCategory);

module.exports = router