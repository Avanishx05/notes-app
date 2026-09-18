const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const noteRoutes = require("./routes/noteRoutes.js");

// Initialize Express app
const app = express();

// 1. Connect to Database
connectDB();

// 2. Mount Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

// 3. Mount Routes
app.use("/api/notes", noteRoutes);

// 4. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});