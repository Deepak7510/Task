import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 50,
    });
    console.log("Mongoose connected:", MONGO_URI);
  } catch (error) {
    console.error("DB Error:", error);
  }
}

export default connectDB;
