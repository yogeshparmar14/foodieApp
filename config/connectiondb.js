import mongoose from "mongoose";

const connectDb = async (DATABASE_URL)=>{
    try {
        const DB_OPTION = {
            dbName:"restaurantapp"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION )
        console.log("connected successfully")
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;