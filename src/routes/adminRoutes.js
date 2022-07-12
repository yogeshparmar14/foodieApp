const express = require("express");
const addCategory = require('../modules/admin/addCategoryControllers.js');
const addDish = require('../modules/admin/addDishController.js');
const checkUserAuth=require('../modules/authentication/authaTokenCheck.js')
 
const router = express.Router();
//Public routes
router.post('/addCategory',checkUserAuth,addCategory);
router.post('/addDish',addDish);


module.exports = router