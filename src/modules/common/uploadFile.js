require("dotenv").config();
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;
const router = express.Router();

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_SECRET_KEY,
});

const ALLOWED_FILE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/pjpeg",
  "image/png",
  "image/*",
];

const MAX_FILE_SIZE_ALLOWED = "10485760"; //10 MB
const uploader = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${uuid()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"], 10);
    if (ALLOWED_FILE_MIME_TYPES.indexOf(file.mimetype) === -1) {
      return cb("NOT_A_VALID_FILE", false);
    }
    if (fileSize > MAX_FILE_SIZE_ALLOWED) {
      return cb("SIZE_EXCEEDS", false);
    }
    return cb(null, true);
  },
  limits: { fileSize: MAX_FILE_SIZE_ALLOWED, files: 2 },
});

router.post("/upload", uploader.array("files"), async (req, res) => {
  try {
    console.log("req.files: ", req.files);
    const uploadedImages = req.files.map((file) => {
        return {
            original: file.location
        }
    });
    res.json({ status: "success", data: uploadedImages });
  } catch (error) {
    console.log(error);
    res.json({ message: "upload file error" });
  }
});

module.exports = router;
