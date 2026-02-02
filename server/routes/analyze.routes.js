import express from "express";
import { analyzeController } from "../controllers/analyze.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * POST /analyze
 * Body:
 * {
 *   imageUri: "gs://bucket/image.jpg",
 *   text: "I feel pain when drinking cold water"
 * }
 */
router.post("/analyze", upload.single("image"), analyzeController);

export default router;
