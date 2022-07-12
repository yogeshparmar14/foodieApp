const userModel=require("../../db/models/dishSchema.js")
const addDish = async (req,res)=>{
    const {dishName,dishPrice,dishImage} = req.body
    if(!dishName || !dishPrice ||!dishImage)
    return res.send({"message":"All fields are required","status":400}) 
    try {
        
        const doc = new userModel({
            dishName:dishName,
            dishPrice:dishPrice,
            dishImage:dishImage,
        })
        await doc.save()
        res.send({"message":`${dishName} is added successfully!`, "status":200,
        "data":{
            "dishName":`${dishName}`,
            "dishPrice":`${dishPrice}`,
            "dishImage":`${dishImage}`}
        })
    } catch (error) {
        console.log(error)
                     res.send({"message":"Unable to add dish","status":403})
    }
}

const getAllDish = async (req,res)=>{
    try{
        const data = await userModel.find();
        res.json(data)
    }
    catch(error){
        res.status(403).json({"message":"Unable to fatch dish"})
    }
}

module.exports = {addDish,getAllDish}