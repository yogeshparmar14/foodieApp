import dotenv from "dotenv";
    dotenv.config();
import s3Uploadv2 from './s3Service.js'
import express from "express";
const app = express();
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
uuidv4();
 

const storage = multer.memoryStorage()

const fileFilter = (req,file,cb)=>{
    if(file.mimetype.split("/")[0]==="image"){
        cb(null,true)
    }else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize:99999999999,files:2}
});

// app.post("/upload",upload.array("file"),

 const uploadImage = async(req,res,next)=>{
    try {
        console.log(req.files)
    const file =req.files[0];
    const result = await s3Uploadv2(file)
    res.json({status:"success",result});
    console.log(result)
    console.log(result.Location)
    } catch (error) {
        console.log(error)
    }
    next();
}
// );

app.use((error,req,res,next) => {
    if(error instanceof multer.MulterError){
        if(error.code === "LIMIT_FILE_SIZE"){
            return res.json({message:"file is too large"})
        }
        if(error.code ==="LIMIT_FILE_COUNT"){
            return res.json({message:"file limit is reached"})
        }
        if(error.code === "LIMIT_UNEXPECTED_FILE"){
            return res.json({message:"file must be image"})
        }
    }
})

 
// app.listen(4000,()=>{
//     console.log("listenig on port 4000");
// });

export { uploadImage }


