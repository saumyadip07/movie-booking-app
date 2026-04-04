//packages
import mongoose from 'mongoose';

//connection function
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}

export default connectDB;