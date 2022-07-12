require("dotenv").config();
const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const uuid = require("uuid").v4;
const router = express.Router();

aws.config.update({
  AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
AWS_DEFAULT_REGION:process.env.AWS_DEFAULT_REGION
})

const s3 = new aws.S3();

const upload=multer({
  storage:multerS3({
    bucket:process.env.AWS_BUCKET_NAME,
    s3:s3,
    acl:"public-read",
    key: (req, file, cb) => {
      cb(null, `${uuid()}-${file.originalname}`);
    }
  })
})

router.post('/upload',upload.single("avatar"),(req,res)=>{
   console.log(req.file)
  res.send(`sucessfully uploaded at ${req.file.location}` )
})

module.exports = router;
 