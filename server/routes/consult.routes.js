import express from "express";
import { consultController } from "../controllers/consult.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

/**
 * POST /consult
 * action: start | chat | close
 */
router.post("/consult", upload.single("image"), consultController);

export default router;
