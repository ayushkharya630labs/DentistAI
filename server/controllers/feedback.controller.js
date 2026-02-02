import { logInteraction } from "../services/bigquery.service.js";

export async function feedbackController(req, res) {
  try {
    const { id, approved, correction } = req.body;

    await logInteraction({
      id,
      approved,
      correction,
      timestamp: new Date(),
    });

    return res.json({
      success: true,
      message: "Feedback saved",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to save feedback",
    });
  }
}
