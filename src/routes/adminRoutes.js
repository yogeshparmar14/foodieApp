const express = require("express");
const addCategory = require('../modules/admin/addCategoryControllers.js');
 
const router = express.Router();
//Public routes
router.post('/addCategory',addCategory);

module.exports = router