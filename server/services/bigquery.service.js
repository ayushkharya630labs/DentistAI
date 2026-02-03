import { BigQuery } from "@google-cloud/bigquery";
import dotenv from "dotenv";

dotenv.config();

const bigquery = new BigQuery({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const datasetId = "dentistai_logs";
const tableId = "interactions";

const schema = [
  { name: "id", type: "STRING" },
  { name: "imageUri", type: "STRING" },
  { name: "userText", type: "STRING" },
  { name: "aiResponse", type: "STRING" },
  { name: "approved", type: "BOOL" },
  { name: "correction", type: "STRING" },
  { name: "timestamp", type: "TIMESTAMP" },
];

async function ensureTableExists() {
  const dataset = bigquery.dataset(datasetId);
  const [datasetExists] = await dataset.exists();

  if (!datasetExists) {
    await dataset.create();
    console.log("✅ Dataset created");
  }

  const table = dataset.table(tableId);
  const [tableExists] = await table.exists();

  if (!tableExists) {
    await dataset.createTable(tableId, { schema });
    console.log("✅ Table created");
  }
}

/**
 * Save AI interaction
 */
export async function logInteraction(row) {
  try {
    await ensureTableExists();
    await bigquery.dataset(datasetId).table(tableId).insert([row]);
    console.log("✅ Logged interaction to BigQuery");
  } catch (err) {
    console.error("BigQuery insert error:", err);
  }
}
