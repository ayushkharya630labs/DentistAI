import { BigQuery } from "@google-cloud/bigquery";
import dotenv from "dotenv";

dotenv.config();

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const datasetId = "dentistai_logs";
const tableId = "interactions";

/**
 * Save AI interaction to BigQuery
 */
export async function logInteraction(row) {
  try {
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert([row]);

    console.log("✅ Logged interaction to BigQuery");
  } catch (err) {
    console.error("BigQuery insert error:", err);
  }
}
