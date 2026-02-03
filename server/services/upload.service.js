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

  await new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", resolve);
    stream.end(file.buffer);
  });

  const gcsUri = `gs://${process.env.GCS_BUCKET}/${filename}`;

  const [signedUrl] = await blob.getSignedUrl({
    action: "read",
    expires: Date.now() + 60 * 60 * 1000, // 1 hour
  });

  return { gcsUri, signedUrl };
}
