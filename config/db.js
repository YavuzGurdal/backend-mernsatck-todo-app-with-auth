import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conndb = mongoose.connect(process.env.MONGO_URI, { // burdan db ye baglaniyorum
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false,
        });

        console.log(`MongoDB connected: ${conndb.connection.host}`.cyan.underline);
    } catch (err) {
        throw err
    }
}