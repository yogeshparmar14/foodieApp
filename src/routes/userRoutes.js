import express from 'express';
import { registration,login } from '../modules/authentication/authController.js';
import authValidation from "../modules/authentication/authValidationSchemas.js";
 

const router = express.Router();


//Router level Middleware - To Protect Route
// router.use('/register',validationRegister);
 

//Public routes
router.post('/register',authValidation,registration);
router.post('/login',login)
 





export default router;