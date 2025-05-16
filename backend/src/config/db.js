import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDb = async()=>{
    const mongoUrl = process.env.Mongo_URL  ;
    try {
        const conn = await mongoose.connect(mongoUrl);
        console.log(`database connected ${conn.connection.host}`)
        
    } catch (error) {
        console.error("database connection failed", error.message);
    }

}


export default connectDb;