import mongoose from "mongoose";

const connectDb = async (DATABASE_URL_LOCAL, DATABASE_URL_ATLAS)=>{
    try {
        const DB_OPTION = {
            dbName:"restaurantapp"
        }
        //   await mongoose.connect(DATABASE_URL1, DB_OPTION )
        // console.log("connected successfully")
        //  await mongoose.connect(DATABASE_URL1, DB_OPTION)
        //    console.log("connected successfully")
        // console.log(process.env.NODE_ENV);
       let DATABASE_URL = DATABASE_URL_LOCAL;
       if(process.env.NODE_ENV === "production"){
        DATABASE_URL = DATABASE_URL_ATLAS
       }

       await mongoose.connect(DATABASE_URL, DB_OPTION )
       console.log("connected successfully")

    } catch (error) {
        console.log(error);
    }
}

export default connectDb;