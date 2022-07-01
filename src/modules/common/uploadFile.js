require("dotenv").config()
const uploadImage = require('./s3Service.js')
const express = require("express");
const multer = require("multer");
const router = express.Router();




// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads")
//     },
//     filename:(req,file,cb)=>{
//            const { originalname } = file
//         cb(null,`${uuid()}-${originalname}`);
//     },
// })

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
// single file upload
// app.post("/upload",upload.single("file"),(req,res)=>{
//    console.log(req.file)
//     res.json({status:"success"});
// });

// multiple file upload
router.use("/upload",upload.array("file"),async(req,res)=>{
    try {
        console.log(req.files)
    const file =req.files[0];
    const result = await uploadImage.s3Uploadv2(file)
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

//multifield upload
// const multifield = upload.fields([
//     {name:"avatar",maxCount:1},
//     {name:"resume",maxCount:1}
// ])
// app.post("/upload",multifield,(req,res)=>{
//     console.log(req.files)
//     res.json({status:"success"});
// });

module.exports = router;