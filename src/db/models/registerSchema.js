import mongoose from "mongoose";

//defining schema


const registerSchema = new mongoose.Schema({
   
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    termCondition:{type:Boolean,required:true},
    createdAt:{type:String},
    updatedAt:{type:Number},
    isActive:{type:Boolean},
    userType:{type:String,default:"USER",trim:true}
})


//model

const userModel = mongoose.model("user",registerSchema)

export default userModel;