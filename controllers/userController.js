import userModel from "../models/schemaUser.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class UserController{
    static userRegistration = async (req,res)=>{
        const {name,email,password,password_confirmation,tc} = req.body

        const user = await userModel.findOne({email:email})
        if(user){
            res.send({"status":"failed","message":"Email already exists"})
        }else{
            if(name&&email&&password&&password_confirmation&&tc){
               if(password===password_confirmation){
                 try {
                    const salt = await bcrypt.genSalt(10)
                    const hashPassword = await bcrypt.hash(password,salt)
                    const doc = new userModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        tc:tc
                    })
                    await doc.save()
                    const saved_user = await userModel.findOne({email:email})
                    //Generating JWT TOKEN
                    const token = jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5D'})
                    res.send({"message":"Signup successfully!", "status":"200",
                    "data":{
                        "_id":saved_user._id,
                        "name":saved_user.name,
                        "email":saved_user.email,
                        "access_token":token}
                    })
                 } catch (error) {
                     console.log(error)
                     res.send({"status":"failed","message":"Unable to register"})
                 }
               }else{
                res.send({"status":"failed","message":"Password and Confirm Password doesn't match"})
               }
            }else{
                res.send({"status":"failed","message":"All fields are required"})
            }
        }
        
    }
}

    export default UserController;
