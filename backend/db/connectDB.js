import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();



const connectDb = async () => {
    try {
        //const DB_NAME = "test";
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error is occurred on ${error}`);
    }
}

export default connectDb;