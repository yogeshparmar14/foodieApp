import dotenv from "dotenv";
    dotenv.config();
import bodyParser from 'body-parser'
import multipart from 'connect-multiparty'
import express from "express";
import cors from "cors";
import connectDb from "./src/db/connectiondb.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";


const app = express();
const port = process.env.PORT;
const DATABASE_URL_LOCAL =process.env.DATABASE_URL_LOCAL
const DATABASE_URL_ATLAS =process.env.DATABASE_URL_ATLAS

//cors policy
app.use(cors());

//json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(multipart());
//Database connection
// connectDb(DATABASE_URL_ATLAS);
connectDb(DATABASE_URL_LOCAL, DATABASE_URL_ATLAS);

//for Loading Routes
app.use("/user",userRoutes)

//for Loading Routes
app.use("/admin",adminRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})