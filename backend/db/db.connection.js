const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;

const initializeDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }

    await mongoose.connect(mongoURI);

    console.log("Connected Successfully");
  } catch (error) {
    console.error("Connection Failed:", error);
    throw error;
  }
};

module.exports = { initializeDatabase };
