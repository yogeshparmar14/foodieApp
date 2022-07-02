require("dotenv").config()
const {s3Uploadv2} = require('./s3Service.js')
const express = require("express");
const multer = require("multer");
const router = express.Router();

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

router.post("/upload",upload.array("file"),async(req,res)=>{
    try {
        console.log(req.files)
    const file =req.files[0];
    const result = await s3Uploadv2(file)
    res.json({status:"success",result});
    // console.log(result)
    console.log(result.Location)
    } catch (error) {
        console.log(error)
    }
});

router.use((error,req,res,next) => {
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

module.exports = router;