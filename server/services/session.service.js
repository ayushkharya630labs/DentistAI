import { BigQuery } from "@google-cloud/bigquery";

const bigquery = new BigQuery();

export async function getSessionHistory(sessionId) {
  const query = `
    SELECT role, message, imageUri
    FROM dentistai_logs.interactions
    WHERE sessionId = @sessionId
    ORDER BY timestamp ASC
  `;

  const [rows] = await bigquery.query({
    query,
    params: { sessionId },
  });

  // extract imageUri separately
  const imageUri = rows.find(r => r.imageUri)?.imageUri;

  const history = rows
    .filter(r => r.role !== "system")
    .map(r => ({
      role: r.role === "ai" ? "model" : "user",
      parts: [{ text: r.message }],
    }));

  return { history, imageUri };
}
