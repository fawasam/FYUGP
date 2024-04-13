import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI_DEV);
    console.log(`Connected to DB`.bgBlue);
  } catch (error) {
    console.log(`Connection failed ${error}`.bgBlue);
  }
};
