import { v4 as uuidv4 } from "uuid";
import { dentistAgent } from "../agents/dentist.agent.js";
import { enforceMedicalGuardrails } from "../guardrails/medical.guardrails.js";
import { uploadImageToGCS } from "../services/upload.service.js";
import { logInteraction } from "../services/bigquery.service.js";
import { getSessionHistory } from "../services/session.service.js";

export async function consultController(req, res) {
  try {
    const { action, sessionId, text } = req.body;

    // ================= START =================
    if (action === "start") {
      const file = req.file;
      if (!file || !text)
        return res.status(400).json({ success: false, message: "image + text required" });

      const newSessionId = uuidv4();
      const { gcsUri, signedUrl } = await uploadImageToGCS(file);

      const ai = await dentistAgent({
        imageUri: gcsUri,
        history: [],
        userText: text,
      });

      const safe = enforceMedicalGuardrails(ai.output);

      await logInteraction({
        id: uuidv4(),
        sessionId: newSessionId,
        role: "user",
        imageUri: gcsUri,
        message: text,
        status: "active",
        timestamp: new Date(),
      });

      await logInteraction({
        id: uuidv4(),
        sessionId: newSessionId,
        role: "ai",
        imageUri: gcsUri,
        message: safe,
        status: "active",
        timestamp: new Date(),
      });

      return res.json({
        success: true,
        sessionId: newSessionId,
        imageUrl: signedUrl,
        reply: safe,
      });
    }

    // ================= CHAT =================
    if (action === "chat") {
      if (!sessionId || !text)
        return res.status(400).json({ success: false, message: "sessionId + text required" });

    const { history, imageUri } = await getSessionHistory(sessionId);

      const ai = await dentistAgent({
        imageUri,
        history,
        userText: text,
      });

      const safe = enforceMedicalGuardrails(ai.output);

      await logInteraction({
        id: uuidv4(),
        sessionId,
        role: "user",
        message: text,
        status: "active",
        timestamp: new Date(),
      });

      await logInteraction({
        id: uuidv4(),
        sessionId,
        role: "ai",
        message: safe,
        status: "active",
        timestamp: new Date(),
      });

      return res.json({ success: true, reply: safe });
    }

    // ================= CLOSE =================
    if (action === "close") {
      await logInteraction({
        id: uuidv4(),
        sessionId,
        role: "system",
        message: "Session closed",
        status: "closed",
        timestamp: new Date(),
      });

      return res.json({ success: true, message: "Session closed" });
    }

    return res.status(400).json({ success: false, message: "Invalid action" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
