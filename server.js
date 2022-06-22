import dotenv from "dotenv";
    dotenv.config();

import express from "express";
import cors from "cors";
import connectDb from "./config/connectiondb.js";
import userRoutes from "./routes/userRoutes.js";


const app = express();
const port = process.env.PORT;
const DATABASE_URL_LOCAL =process.env.DATABASE_URL_LOCAL
const DATABASE_URL_ATLAS =process.env.DATABASE_URL_ATLAS

//cors policy
app.use(cors());

//json
app.use(express.json());

//Database connection
connectDb(DATABASE_URL_LOCAL, DATABASE_URL_ATLAS);

//Load Routes
app.use("/user",userRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})