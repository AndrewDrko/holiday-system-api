import mongoose from "mongoose";

async function connection() {
  try {
    await mongoose.connect(
      `mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`
    );
    console.log("connection successfull");
  } catch (error) {
    console.error(error);
    throw new Error("Error try to connect to database, try more later. ");
  }
}

export default connection;
