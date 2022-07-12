const mongoose = require("mongoose");
const date = new Date().getTime();
const dishSchema = new mongoose.Schema({
   
    dishName:{type:String,required:true},
    dishPrice:{type:Number,required:true},
    dishImage:{type:String,required:true},
    createdAt:{type:String,default:date},
    updatedAt:{type:Number},
    isActive:{type:Boolean}
    

})

const userModel = mongoose.model("dishname",dishSchema)

module.exports = userModel;