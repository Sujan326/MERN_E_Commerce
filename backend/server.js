import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConfig.js";
import connectCloudinary from "./config/cloudinary.js";

// App Config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json()); // Request parsed in json format
app.use(cors()); // access backend from any IP

// Endpoints
app.get("/", (req, res) => {
  res.send("API RUNNING...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running in: http://localhost:${PORT}`);
});
