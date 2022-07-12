const express = require("express");
const addCategory = require('../modules/admin/addCategoryControllers.js');
const {addDish,getAllDish}= require('../modules/admin/addDishController.js');
const {placeOrder,getOrders} = require('../modules/admin/placeOrderControllers.js');
const checkUserAuth=require('../modules/authentication/authaTokenCheck.js')
 
const router = express.Router();
//Public routes
router.post('/addCategory',checkUserAuth,addCategory);
router.post('/addDish',checkUserAuth,addDish);
router.get("/getAllDishes",getAllDish);
router.post('/placeOrder',checkUserAuth,placeOrder);
router.get("/getOrders",getOrders)

module.exports = router