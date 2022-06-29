import mongoose from "mongoose";

const connectDb = async (DATABASE_URL_LOCAL, DATABASE_URL_ATLAS)=>{
    try {
         const DB_OPTION = {
            dbName:"restaurantapp"
        }
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

// const connectDb = async (DATABASE_URL_ATLAS)=>{
//     try { 
//          const DB_OPTION = {
//             dbName:"restaurantapp"
//         }
       
//         let DATABASE_URL = DATABASE_URL_ATLAS
       

//        await mongoose.connect(DATABASE_URL, DB_OPTION,{
//         useUnifiedTopology: true,
//         useNewUrlParser: true
    
//     } )
//        console.log("connected successfully")

//     } catch (error) {
//         console.log(error);
//     }
// }

export default connectDb;