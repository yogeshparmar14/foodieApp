import express from 'express';
import  { userRegistration,userLogin } from '../controllers/userController.js';
import validationRegister from "../middlewares/validationRegisterMiddlewares.js";
 

const router = express.Router();


//Router level Middleware - To Protect Route
// router.use('/register',validationRegister);
 

//Public routes
router.post('/register',validationRegister,userRegistration);
router.post('/login',userLogin)
 





export default router;