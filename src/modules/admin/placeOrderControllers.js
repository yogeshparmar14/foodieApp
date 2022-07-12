const userModel=require("../../db/models/orderSchema")

const placeOrder = async (req,res)=>{
    const {dishId,quantity} = req.body
    console.log(req.user)
    console.log(req.user._id)
    if(!dishId || !quantity)
    return res.send({"message":"All fields are required","status":400}) 
    try {
        
        const doc = new userModel({
            dishId:dishId,
            quantity:quantity,
            userId:req.user._id,
        })
        await doc.save()
        res.send({"message":`Your order is placed successfully!`, "status":200,
        "data":{
            "dishId":`${dishId}`,
            "quantity":`${quantity}`,
            "userId":`${req.user._id}`
        }
        })
    } catch (error) {
        console.log(error)
                     res.send({"message":"Unable to place order","status":403})
    }
}

const getOrders = async (req,res)=>{
    try{
        const data = await userModel.find();
        res.json(data)
    }
    catch(error){
        res.status(403).json({"message":"Unable to fatch orders"})
    }
}


module.exports = {placeOrder,getOrders}