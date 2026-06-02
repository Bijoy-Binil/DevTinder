const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);

    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error);

    // IMPORTANT
    throw error;
  }
};

module.exports = connectDB;