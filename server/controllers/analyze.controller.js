import { v4 as uuidv4 } from "uuid";
import { dentistAgent } from "../agents/dentist.agent.js";
import { enforceMedicalGuardrails } from "../guardrails/medical.guardrails.js";
import { uploadImageToGCS } from "../services/upload.service.js";
import { logInteraction } from "../services/bigquery.service.js";

export async function analyzeController(req, res) {
  try {
    const file = req.file;
    const { text } = req.body;

    if (!file || !text) {
      return res.status(400).json({
        success: false,
        message: "image file and text are required",
      });
    }

    const imageUri = await uploadImageToGCS(file);

    const aiResult = await dentistAgent({
      imageUri,
      userText: text,
    });

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: aiResult.error,
      });
    }

    const safeResponse = enforceMedicalGuardrails(aiResult.output);

    // ✅ Save to BigQuery
    await logInteraction({
      id: uuidv4(),
      imageUri,
      userText: text,
      aiResponse: safeResponse,
      approved: null,
      correction: null,
      timestamp: new Date(),
    });

    return res.status(200).json({
      success: true,
      data: {
        imageUri,
        findings: safeResponse,
      },
    });
  } catch (error) {
    console.error("Analyze Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
