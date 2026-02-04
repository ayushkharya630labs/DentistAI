import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import consultRoutes from "./routes/consult.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("DentistAI backend is running");
});

// Routes
app.use("/api", consultRoutes);
app.use("/api", feedbackRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 DentistAI backend running on port ${PORT}`);
});
