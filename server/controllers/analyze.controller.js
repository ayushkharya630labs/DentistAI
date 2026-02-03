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

    // ✅ Upload image + get signed preview URL
    const { gcsUri, signedUrl } = await uploadImageToGCS(file);

    // ✅ Call Gemini AI
    const aiResult = await dentistAgent({
      imageUri: gcsUri,
      userText: text,
    });

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: aiResult.error,
      });
    }

    const safeResponse = enforceMedicalGuardrails(aiResult.output);

    // ✅ Save interaction to BigQuery (training dataset)
    await logInteraction({
      id: uuidv4(),
      imageUri: gcsUri,
      userText: text,
      aiResponse: safeResponse,
      approved: null,
      correction: null,
      timestamp: new Date(),
    });

    // ✅ Return signed image URL to frontend
    return res.status(200).json({
      success: true,
      data: {
        imageUrl: signedUrl, // frontend will display this
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
