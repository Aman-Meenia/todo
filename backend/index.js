import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/mongooseConnect.js";
import cors from "cors";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Routes

import todoRoutes from "./routes/todoRoutes.js";

app.use("/api/todo", todoRoutes);

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {}
