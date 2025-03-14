import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle disconnects
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected. Attempting to reconnect...");
      connectDB(); // Try reconnecting automatically
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

// In the code snippet above, we imported the mongoose package and created a function called connectDB. This function connects to the MongoDB database using the MONGO_URI environment variable. If the connection is successful, it logs a message to the console. If there is an error, it logs the error message and exits the process with an exit code of 1.
