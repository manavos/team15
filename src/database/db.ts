import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url: string = process.env.MONGO_URI as string;
let connection: typeof mongoose;

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function before all api routes
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  if (!connection) {
    // uncomment this line once you have the MONGO_URI set up
    console.log("connecting to DB");
    connection = await mongoose.connect(url);
    console.log("successful");
    return connection;
  }
};

export default connectDB;
