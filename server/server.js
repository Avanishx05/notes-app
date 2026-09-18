const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

// Initialize Express app
const app = express();

// 1. Connect to Database
connectDB();

// 2. Mount Middleware
// Explicitly permit cross-origin requests from the Vite dev server
app.use(cors({
  origin: "http://localhost:5173"
}));

// Parse incoming request payloads with JSON payloads
app.use(express.json());

// 3. Mount Routes (Placeholder for Step 3)
app.get("/", (req, res) => {
  res.send("Notes API is running...");
});

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});