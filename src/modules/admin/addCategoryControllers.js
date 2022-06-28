import userModel from "../../db/models/categorySchema.js"

  

const addCategory = async (req,res)=>{

    
    console.log(req.file.location)
    const {categoryName,categoryDescription,categoryImage} = req.body
    if(!categoryName || !categoryDescription ||!categoryImage)
    return res.send({"message":"All fields are required","status":400}) 
    try {
        
        const doc = new userModel({
            categoryName:categoryName,
            categoryDescription:categoryDescription,
            categoryImage:categoryImage,
        })
        await doc.save()
        res.send({"message":"Signup successfully!", "status":200,
        "data":{
            "categoryName":categoryName,
            "categoryDescription":categoryDescription,
            "categoryImage":categoryImage}
        })
    } catch (error) {
        console.log(error)
                     res.send({"message":"Unable to add category","status":400})
    }
}

export default addCategory