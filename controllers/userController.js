import userModel from "../models/schemaRegister.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRegistration = async (req,res)=>{
    const {name,email,password,termCondition,userType} = req.body

    const user = await userModel.findOne({email})
    if(user)
        return res.send({"message":"Email already exists","status":400})
    if(!name || !email||!password||!termCondition||!userType)
        return res.send({"message":"All fields are required","status":400})     
                try {
                    const date = new Date().getTime();
                    console.log(date)
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const doc = new userModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        termCondition:termCondition,
                        createdAt:date,
                        userType:userType
                    })
                    await doc.save()
                    const savedUser = await userModel.findOne({email})
                    //Generating JWT TOKEN
                    const token = jwt.sign({userID:savedUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'5D'})
                    res.send({"message":"Signup successfully!", "status":200,
                    "data":{
                        "_id":savedUser._id,
                        "name":savedUser.name,
                        "email":savedUser.email,
                        "access_token":token}
                    })
                 } catch (error) {
                     console.log(error)
                     res.send({"message":"Unable to register","status":400})
                 
               
               }
            }
    export default userRegistration;
