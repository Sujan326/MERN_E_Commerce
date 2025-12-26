import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/dbConfig.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

// App Config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json()); // Request parsed in json format
app.use(cors()); // access backend from any IP

// Endpoints
app.use("/api/user", userRouter); // http://localhost:3000/api/user/register
app.use("/api/product", productRouter); // http://localhost:3000/api/product/add-product

app.get("/", (req, res) => {
  res.send("API RUNNING...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server Running in: http://localhost:${PORT}`);
});
