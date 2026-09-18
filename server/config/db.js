const mongoose = require("mongoose");

const connectDB = () => {
  const mongoURI = "mongodb://localhost:27017/notes_db";

  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("MongoDB Connection Established Successfully");
    })
    .catch((err) => {
      console.error("MongoDB Connection Failed:");
      console.error(err.message);
      process.exit(1); // Exit process with failure
    });
};

module.exports = connectDB;