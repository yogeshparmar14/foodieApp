const mongoose = require("mongoose");
const date = new Date().getTime();
const orderSchema = new mongoose.Schema({
   
    dishId:{type:String,required:true},
    quantity:{type:Number,required:true},
    userId:{type:String,required:true},
    createdAt:{type:String,default:date},
    updatedAt:{type:Number},
    isActive:{type:Boolean}
    

})

const userModel = mongoose.model("order",orderSchema)

module.exports = userModel;