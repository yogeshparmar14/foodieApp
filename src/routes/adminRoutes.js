import express from 'express';
 import addCategory from '../modules/admin/addCategoryControllers.js';

const router = express.Router();

//Public routes
router.post('/addcategory',addCategory);

export default router