import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected to host: ", (await conn).connection.host);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1); //1 means error
  }
};
