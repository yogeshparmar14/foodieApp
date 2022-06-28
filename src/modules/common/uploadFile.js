import dotenv from "dotenv";
    dotenv.config();
    
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';  

aws.config.update({
    secretAccessKey:process.env.ACCESS_SECRET_KEY,
    accessKeyId:process.env.AKIAWCQZ25INBUDNVCHJ
})
const s3 = new aws.S3();
const bucket = process.env.BUCKET


const upload = ()=>multer({
    storage:multerS3({
        bucket:bucket,
        s3:s3,
        acl:"public-read",
        key:(req,file,cb)=>{
            console.log(file);
            cb(null,`${Date.now}file.originalname`);
        }
    })
})



const uploadImage = async (req,res)=>{
    try {
          upload();
    } catch (error) {
        console.log(error)
        res.send({"message":"Unable to upload image","status":400})
    } 
}
  

export default uploadImage