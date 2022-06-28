import express from "express";
import multer from 'multer'
import addCategory from '../modules/admin/addCategoryControllers.js';
import {uploadImage} from '../modules/common/uploadimage.js'

const storage = multer.memoryStorage()

const fileFilter = (req,file,cb)=>{
    if(file.mimetype.split("/")[0]==="image"){
        cb(null,true)
    }else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"),false)
    }
}

const router = express.Router();
const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize:99999999999,files:2}
});

//Public routes
router.post('/addcategory',upload.array("file"),uploadImage,addCategory);

export default router