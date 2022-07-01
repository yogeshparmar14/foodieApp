require("dotenv").config()
const {S3} = require("aws-sdk")
const uuid = require("uuid").v4

exports.s3Uploadv2 = async (file) =>{
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