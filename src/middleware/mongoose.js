import mongoose from "mongoose";

const connectDb = async (handler) => {
    if (mongoose.connections[0].readyState) {
        console.log("Already connected");
        return handler;
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB");
    return handler;
}

export default connectDb;