import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conndb = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected: ${conndb.connection.host}`.cyan.underline);
    } catch (err) {
        throw err
    }
}