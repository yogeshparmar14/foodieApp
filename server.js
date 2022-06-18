import dotenv from "dotenv";
    dotenv.config();

import express from "express";
import cors from "cors";
import connectDb from "./config/connectiondb.js";
import userRoutes from "./Routes/userRoutes.js";


const app = express();
const port = process.env.PORT;
const DATABASE_URL =process.env.DATABASE_URL

//cors policy
app.use(cors());

//json
app.use(express.json());

//Database connection
connectDb(DATABASE_URL);

//Load Routes
app.use("/user",userRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})