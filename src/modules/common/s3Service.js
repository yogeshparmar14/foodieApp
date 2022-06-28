import dotenv from "dotenv";
    dotenv.config();
import S3 from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const s3Uploadv2 = async (file) =>{
    const s3 = new S3({
        accessKeyId: process.env.ACCESS_KEY, 
  secretAccessKey: process.env.ACCESS_SECRET_KEY
     })
    const param = {
        Bucket:process.env.BUCKET,
        Key:`uploads/${uuid()}-${file.originalname}`,
        Body:file.buffer,
        ACL:'public-read'
    }
    return await s3.upload(param).promise();
//     const params = files.map(file=>{
//         return{
//             Bucket:process.env.BUCKET,
//             Key:`uploads/${uuid()}-${file.originalname}`,
//             Body:file.buffer,
//         }
//     })
//    return await Promise.all(params.map(param=>s3.upload(param).promise()));


}  
export default s3Uploadv2