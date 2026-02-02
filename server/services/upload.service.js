import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

export async function uploadImageToGCS(file) {
  const filename = `${uuidv4()}-${file.originalname}`;
  const blob = bucket.file(filename);

  const stream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", reject);

    stream.on("finish", () => {
      const gcsUri = `gs://${process.env.GCS_BUCKET}/${filename}`;
      resolve(gcsUri);
    });

    stream.end(file.buffer);
  });
}
